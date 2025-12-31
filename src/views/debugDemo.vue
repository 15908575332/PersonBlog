<template>
    <div style="overflow: hidden;">
        <div class="app-container">
            <!-- 左侧菜单栏 -->
            <div class="sidebar">
                <div class="avatar">
                    <img :src='userStore.user.avatarUrl' alt="avatar">
                </div>
                <div class="menu">
                    <div v-for="item in menuItems" :key="item.id"
                        :class="['menu-item', { active: activeMenu === item.id }]" @click="switchMenu(item.id)">
                        <img class="icon" :src="item.icon" alt="icon">
                        <span class="label">{{ item.label }}</span>
                    </div>
                </div>

                <!-- 底部图标 -->
                <div class="bottom-icons">
                    <div class="icon-btn" @click="handleOpenMoments">
                        <img src="@/assets/icon/instantMessaging/icons8-aperture-64.png" alt="settings">
                    </div>
                    <div class="icon-btn" @click="handleSettings">
                        <img src="@/assets/icon/instantMessaging/icons8-setting-100.png" alt="settings">
                    </div>
                </div>
            </div>

            <!-- 中间会话列表 -->
            <div class="list-container">
                <!--  搜索框 -->
                <div class="list-header">
                    <div class="search-box">
                        <input type="text" v-model="searchQuery" :placeholder="`搜索${currentMenuTitle}`"
                            class="search-input" />
                    </div>
                </div>
                <div class="list-content">
                    <!-- 系统消息列表 -->
                    <div v-if="activeMenu === 'system'" class="list-section">
                        <div v-for="msg in filteredSystemMessages" :key="msg.id"
                            :class="['list-item', { active: selectedItem?.id === msg.id }]" @click="selectItem(msg)">
                            <div class="avatar">
                                <a-badge :dot="!msg.isRead">
                                    <img class="avatar-icon"
                                        src="@/assets/icon/instantMessaging/icons8-commercial-64.png"
                                        alt="avatar"></img>
                                </a-badge>
                            </div>
                            <div class="content">
                                <p class="title">{{ msg.title }}</p>
                                <p class="preview">{{ msg.preview }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- 聊天列表 -->
                    <div v-else-if="activeMenu === 'chat'" class="list-section">
                        <div v-for="session in filteredChatSessions" :key="session.id"
                            :class="['list-item', { active: selectedItem?.id === session.id }]"
                            @click="selectChatSession(session)">
                            <div class="avatar">
                                <img :src="session.avatar" alt="avatar" class="avatar-icon" />
                            </div>
                            <div class="content">
                                <p class="title">{{ session.name }}</p>
                                <p class="preview">{{ session.preview }}</p>
                            </div>
                            <a-badge v-if="session.unreadCount > 0" :count="session.unreadCount" />
                        </div>
                    </div>

                    <!-- 好友列表 -->
                    <div v-else-if="activeMenu === 'friend'" class="list-section">
                        <div class="addFriend">
                            <img src="@/assets/icon/instantMessaging/icons8-add-user-32.png" alt="">
                            <span>新的朋友</span>
                        </div>
                        <div class="countFriend">
                            <span>共{{ friendCounts }}个联系人</span>
                        </div>
                        <div v-for="friend in filteredFriends" :key="friend.id"
                            :class="['list-item', { active: selectedItem?.id === friend.id }]"
                            @click="selectItem(friend)">
                            <div class="friend-list" v-if="friend.friend_status === 1">
                                <div class="avatar">
                                    <img class="avatar-icon" :src="friend.avatar_url" @error="handleAvatarError" />
                                </div>
                                <p class="title">{{ friend.username }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- 群聊列表 -->
                    <div v-else-if="activeMenu === 'group'" class="list-section">
                        <div v-for="group in filteredGroups" :key="group.id"
                            :class="['list-item', { active: selectedItem?.id === group.id }]"
                            @click="switchMenu('group'); selectItem(group)">
                            <div class="avatar">
                                <img class="avatar-icon" src="@/assets/icon/instantMessaging/icons8-group-64.png" />
                            </div>
                            <div class="content">
                                <p class="title">{{ group.name }}</p>
                                <p class="members">{{ group.memberCount }}位成员</p>
                            </div>
                            <a-badge :count="group.count" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 右侧详情区域 -->
            <div class="detail-container">
                <div v-if="selectedItem" class="detail-content">
                    <div class="detail-header">
                        <h2 v-if="selectedItem.name">{{ selectedItem.name }}</h2>
                        <h2 v-else-if="selectedItem.username">好友资料</h2>
                        <h2 v-else>{{ selectedItem.title }}</h2>
                    </div>

                    <!-- 系统消息详情 -->
                    <div v-if="activeMenu === 'system'" class="detail-section">
                        <div class="detail-body">
                            <div class="message-bubble">
                                <img class="avatar-icon"
                                    src="@/assets/icon/instantMessaging/icons8-system-message-48.png" />
                                <div>
                                    <p class="time">{{ formatTime(selectedItem.realseTime) }}</p>
                                    <p class="selectedContent">{{ selectedItem.content }}</p>
                                </div>
                            </div>
                            <!-- <div class="actions">
                                <button @click="markAsRead(selectedItem.id)" class="btn">标记为已读</button>
                                <button @click="deleteItem(selectedItem.id)" class="btn secondary">删除</button>
                            </div> -->
                        </div>
                    </div>

                    <!-- 聊天详情 -->
                    <div v-else-if="activeMenu === 'chat'" class="detail-section chat-section">
                        <div class="chatMessage">
                            <ChatMessage :messages="selectedItem.messages" @scroll="scrollToBottom"/>
                        </div>
                        <div class="chatInput">
                            <ChatInput @send="handleSendMessage" />
                        </div>
                    </div>

                    <!-- 好友详情 -->
                    <div v-else-if="activeMenu === 'friend'" class="detail-section">
                        <div class="detail-body">
                            <div class="info-card">
                                <p class="email">
                                    <strong>邮箱：</strong>
                                    <span>{{ selectedItem.email }}</span>
                                    <img :src="utils.getAssetsFile('icon/instantMessaging/icons8-' + (selectedItem.sex === '男' ? 'male' : 'female')
                                        + '-64.png')">
                                </p>
                                <p>
                                    <strong>手机号：</strong>
                                    <span v-if="selectedItem.phone">{{ selectedItem.phone }}</span>
                                    <span v-else>未填写</span>
                                </p>
                                <p>
                                    <strong>加入日期：</strong>
                                    <span>{{ formatDate(selectedItem.addTime) }}</span>
                                </p>
                                <p>
                                    <strong>个人简介：</strong>
                                    <span v-if="selectedItem.introduce" class="introduce">{{ selectedItem.introduce
                                        }}</span>
                                    <span v-else>无</span>
                                </p>
                                <p class="level">
                                    <strong>会员等级：</strong>
                                    <img class="level-icon" :src="utils.getAssetsFile('icon/level/lv' + selectedItem.vip_level
                                        + '.svg')" alt="level">
                                <div v-for="index in parseInt(selectedItem.vip_level)" :key="index">
                                    <img class="sun" src="@/assets/icon/instantMessaging/icons8-sun-50.png" alt="">
                                </div>
                                </p>
                            </div>
                            <div class="actions">
                                <button class="btn" @click.stop="startChat(selectedItem)">发送消息</button>
                                <!-- <button class="btn secondary">查看资料</button> -->
                            </div>
                        </div>
                    </div>

                    <!-- 群聊详情 -->
                    <div v-else-if="activeMenu === 'group'" class="detail-section">
                        <div class="detail-body">
                            <div class="group-info">
                                <p><strong>创建者:</strong> {{ selectedItem.owner }}</p>
                                <p><strong>创建日期:</strong> {{ formatDate(selectedItem.createdAt) }}</p>
                                <p><strong>描述:</strong> {{ selectedItem.description }}</p>
                            </div>
                            <div class="actions">
                                <button class="btn" @click.stop="startChat(selectedItem)">发送消息</button>
                                <button class="btn secondary">管理群聊</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="empty-detail">
                    <div class="empty-icon">📭</div>
                    <h3>没有选择任何项目</h3>
                    <p>请从左侧列表中选择一个项目查看详情</p>
                </div>
            </div>
        </div>
        <!-- 朋友圈 -->
        <div class="modal">
            <ModalBox :isVisible="showModal" @close="handCloseMoments" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance, watchEffect } from 'vue'
import systemIcon from '@/assets/icon/instantMessaging/icons8-system-40.png'
import chatMessageIcon from '@/assets/icon/instantMessaging/icons8-message-64.png'
import groupMessageIcon from '@/assets/icon/instantMessaging/icons8-group-50.png'
import friendIcon from '@/assets/icon/instantMessaging/icons8-people-48.png'
import ChatMessage from '@/components/ChatMessage/index.vue'
import ChatInput from '@/components/ChatInput/index.vue'
const instance = getCurrentInstance();
const $http = instance.appContext.config.globalProperties.$http;
import { useAuthStore } from "@/store/auth";
const userStore = useAuthStore();
import { useRouter } from 'vue-router';
const route = useRouter();
import ModalBox from '@/components/ModalBox/index.vue'
import utils from '@/utils/getAssetsFile';
/** ------------------------ 左侧slider ------------------------ */
const activeMenu = ref('system') // 当前激活的菜单
const selectedItem = ref(null) // 当前选中的项目
const searchQuery = ref('') // 搜索内容
const menuItems = ref([
    { id: 'system', label: '系统', icon: systemIcon },
    { id: 'chat', label: '聊天', icon: chatMessageIcon },
    { id: 'friend', label: '好友', icon: friendIcon },
    { id: 'group', label: '群聊', icon: groupMessageIcon }
])

/** ------------------------ 中间栏list ------------------------ */
const currentMenuTitle = computed(() => { //搜索框动态placeholder
    const menu = menuItems.value.find(item => item.id === activeMenu.value)
    return menu ? menu.label : ''
})
const chatSessions = ref([ //聊天列表
    {
        id: 'friend_1',
        name: '张三',
        type: 'friend',
        preview: '晚上一起吃饭？',
        time: '2023-06-16T10:31:00Z',
        unreadCount: 0,
        avatar: 'src/assets/img/profile_picture/10008.png'
    },
    {
        id: 'friend_2',
        name: '李四',
        type: 'friend',
        preview: '收到，谢谢！',
        time: '2023-06-15T16:30:00Z',
        unreadCount: 1,
        avatar: 'src/assets/img/profile_picture/10009.png'
    },
    {
        id: 'group_11',
        name: '前端开发组',
        type: 'group',
        preview: '方案初稿已上传',
        time: '2023-06-16T10:30:00Z',
        unreadCount: 3,
        avatar: 'src/assets/icon/instantMessaging/icons8-group-64.png'

    }
])

/** ------------------------ 右侧聊天详情 ------------------------ */
function handleSendMessage(messageData) {
    console.log('发送的消息数据:', messageData);
    if (!selectedItem.value || (!messageData.text && !messageData.image)) return;

    const chatId = selectedItem.value.id;

    // 创建新消息 - 正确处理图片和文本
    const newMessage = {
        id: Date.now(),
        sender: "你",
        content: messageData.text || '', // 文本内容
        image: messageData.image || null, // 图片数据（File对象或Base64）
        time: new Date().toISOString(),
        isMine: true
    };

    // 添加到对应聊天记录
    if (!chatMessages.value[chatId]) {
        chatMessages.value[chatId] = [];
    }
    chatMessages.value[chatId].push(newMessage);

    // 更新会话预览
    const sessionIndex = chatSessions.value.findIndex(session => session.id === chatId);
    if (sessionIndex !== -1) {
        const previewText = messageData.image ? '[图片]' : messageData.text;
        chatSessions.value[sessionIndex].preview = previewText;
        chatSessions.value[sessionIndex].time = newMessage.time;
    }

    // 更新当前显示的聊天记录
    selectedItem.value.messages = [...chatMessages.value[chatId]];

    // 可以添加模拟回复
    simulateReply(chatId);
}

function simulateReply(chatId) { // 模拟回复
    setTimeout(() => {
        const replyMessage = {
            id: Date.now() + 1,
            sender: chatId.startsWith('friend_')
                ? chatSessions.value.find(s => s.id === chatId)?.name || '好友'
                : '群成员',
            content: '收到你的消息了！',
            time: new Date().toISOString(),
            isMine: false,
            avatar: 'src/assets/img/profile_picture/10010.png'

        };

        chatMessages.value[chatId].push(replyMessage);

        // 更新会话预览
        const sessionIndex = chatSessions.value.findIndex(session => session.id === chatId);
        if (sessionIndex !== -1) {
            chatSessions.value[sessionIndex].preview = replyMessage.content;
            chatSessions.value[sessionIndex].time = replyMessage.time;
            chatSessions.value[sessionIndex].unreadCount += 1;
        }

        // 如果当前正在查看这个聊天，更新显示
        if (selectedItem.value?.id === chatId) {
            selectedItem.value.messages = [...chatMessages.value[chatId]];
        }
    }, 2000);
}

/** ------------------------ 公共属性 ------------------------ */
function formatDate(dateString) { //日期格式化
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
function formatTime(timeString) { //时间格式化
    const date = new Date(timeString)
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}

function startChat(target) { //发送消息按钮
    // 生成唯一的聊天ID
    const chatId = `${target.email}_${target.id}`;
    // 检查是否已存在聊天会话
    let existingSession = chatSessions.value.find(session => session.id === chatId);
    if (!existingSession) {
        // 创建新的聊天会话
        const newSession = {
            id: chatId,
            name: target.username,
            type: target.type,
            preview: '',
            time: new Date().toISOString(),
            unreadCount: 0,
            avatar: target.avatar_url
        };
        chatSessions.value.unshift(newSession);
        // 初始化聊天记录（如果不存在）
        if (!chatMessages.value[chatId]) {
            chatMessages.value[chatId] = target.messages ? [...target.messages] : [];
        }
    }
    // 查找或设置当前会话
    const currentSession = chatSessions.value.find(session => session.id === chatId);
    selectedItem.value = {
        ...currentSession,
        messages: chatMessages.value[chatId] || []
    };
    // 切换到聊天界面
    activeMenu.value = 'chat';
}

function scrollToBottom() { //发送新消息时自动滚动到底部
    // const container = document.querySelector('.chat-messages');
    // if (container) container.scrollTop = container.scrollHeight;
}

function selectChatSession(session) {  // 获取选中会话的聊天记录
    const messages = chatMessages.value[session.id] || [];
    selectedItem.value = {
        ...session,
        messages: messages
    };

    // 重置未读计数
    const sessionIndex = chatSessions.value.findIndex(s => s.id === session.id);
    if (sessionIndex !== -1) {
        chatSessions.value[sessionIndex].unreadCount = 0;
    }
}

const filteredChatSessions = computed(() => { // 聊天记录过滤逻辑
    if (!searchQuery.value) return chatSessions.value;

    return chatSessions.value.filter(session =>
        session.name.includes(searchQuery.value) ||
        session.preview.includes(searchQuery.value)
    );
});

const filteredSystemMessages = computed(() => { // 系统消息过滤逻辑
    if (!searchQuery.value) return systemMessages.value
    return systemMessages.value.filter(msg =>
        msg.title.includes(searchQuery.value) ||
        msg.preview.includes(searchQuery.value)
    )
})

const filteredGroups = computed(() => { // 群组列表过滤逻辑
    if (!searchQuery.value) return groups.value
    return groups.value.filter(group =>
        group.name.includes(searchQuery.value)
    )
})

function switchMenu(menuId) { //选中项切换/菜单切换
    activeMenu.value = menuId
    selectedItem.value = null
    searchQuery.value = ''
}

function selectItem(item) { //选中项详情展示
    selectedItem.value = item;
    item.isRead = true;
}

/** ------------------------ 数据模拟 ------------------------ */

const chatMessages = ref({ //聊天数据列表
    // 好友聊天记录
    'friend_1': [
        {
            id: 1,
            sender: '你',
            content: '今天有空吗？',
            time: '2023-06-16T10:30:00Z',
            isMine: true,
            avatar: 'src/assets/img/profile_picture/10008.png'
        },
        {
            id: 2,
            sender: '张三',
            content: '晚上一起吃饭？',
            time: '2023-06-16T10:31:00Z',
            isMine: false,
            avatar: 'src/assets/img/profile_picture/10009.png'
        }
    ],
    'friend_2': [
        {
            id: 3,
            sender: '你',
            content: '周末有什么安排？',
            time: '2023-06-15T15:20:00Z',
            isMine: true,
            avatar: 'src/assets/img/profile_picture/10010.png'
        }
    ],
    // 群聊聊天记录
    'group_11': [
        {
            id: 101,
            sender: '你',
            content: '方案初稿已上传',
            time: '2023-06-16T10:30:00Z',
            isMine: true
        },
        {
            id: 202,
            sender: '李四',
            content: '看起来不错，稍后讨论',
            time: '2023-06-16T10:31:00Z',
            isMine: false
        }
    ]
})

/** ------------------------ 系统消息 ------------------------ */
const systemMessages = ref([]);
const getSystemNotice = async () => {
    try {
        const response = await $http.get('/instansMessaging/im_system_notifications');
        systemMessages.value = response.result;
    } catch (error) {
        console.error('获取系统通知失败:', error);
    }
};

/** ------------------------ 好友列表 ------------------------ */
const friends = ref([]); //好友列表
const friendCounts = ref(0); //好友数量

const getFriendsList = async () => {
    //传入当前用户ID，获取好友列表
    try {
        const response = await $http.get('/instansMessaging/im_friend_list', {
            params: {
                user_id: userStore.user.userId,
            }
        });
        friends.value = response?.friend_list;
        friendCounts.value = response?.friend_counts[0]?.friend_count || 0;
    } catch (error) {
        console.error('获取好友列表失败:', error);
    }
};

// const pendingFriends = ref([]); //状态为1的好友列表
// const filteredFriends = ref([]); //搜索后的好友列表
// watchEffect(friends, (newFriends) => {
//     pendingFriends.value = newFriends.filter(friend => friend.friend_status === 1);
//     if (!searchQuery.value) {
//         filteredFriends.value = pendingFriends.value;
//     } else {
//         filteredFriends.value = pendingFriends.value.filter(friend =>
//             friend.username.includes(searchQuery.value)
//         );
//     }
// }, { immediate: true, deep: true });

const pendingFriends = computed(() => {
    return friends.value?.filter(friend => friend.friend_status === 1);
});
const filteredFriends = computed(() => {
    if (!searchQuery.value) {
        return pendingFriends.value;
    } else {
        const query = searchQuery.value.toLowerCase();
        return pendingFriends.value.filter(friend =>
            friend.username.toLowerCase().includes(query) ||
            friend.email?.toLowerCase().includes(query) ||
            friend.phone?.includes(query)
        );
    }
});

const handleAvatarError = (event) => { //头像加载失败处理
    event.target.src = 'src/assets/icon/instantMessaging/icons8-people-48.png'; //替换为默认头像
};

/** ------------------------ 群组列表 ------------------------ */
const groups = ref([ //群组列表
    {
        id: 11,
        name: '前端开发组',
        memberCount: 8,
        owner: '技术主管',
        createdAt: '2022-02-10',
        description: '负责公司所有前端项目的开发与维护',
        count: 999,
        type: 'group'
    },
])

/** ------------------------ 其它功能 ------------------------ */
const showModal = ref(false);
function markAsRead(id) { //标记已读
    console.log(`标记为已读: ${id}`)
    // 实际应用中这里会有API调用
}

function deleteItem(id) { //删除聊天记录及其列表
    console.log(`删除项目: ${id}`)
    // 实际应用中这里会有API调用
}

function handleOpenMoments() { //打开朋友圈
    showModal.value = true;
}

const handCloseMoments = () => { //关闭朋友圈
    showModal.value = false;
}

function handleSettings() { //设置
    route.push('/personalCenter');
}

onMounted(async () => {
    await getSystemNotice();
    await getFriendsList();
});
</script>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'gtpy', 'Microsoft YaHei', sans-serif;
}

.app-container {
    display: flex;
    width: 60vw;
    height: 80vh;
    margin: 10vh auto;
    background-color: #f0f2f5;
    color: #333;
    box-shadow: $shadow-card;
    border-radius: 0.4rem;
    overflow: hidden;
}

/* 左侧导航栏样式 */
.sidebar {
    width: 60px;
    background-color: $general-white;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-right: 1px solid #e8e8e8;

    .avatar {
        width: 100%;
        font-size: 20px;
        text-align: center;
        padding: 0.5rem;

        img {
            width: 40px;
            height: 40px;
            border-radius: 0.2rem;
        }
    }

    .menu {
        @include flexCenter(column, flex-start);
        flex: 1;
        gap: 0.5rem;
        padding: 0.5rem 0;
        position: relative;

        .menu-item {
            display: flex;
            width: 100%;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s;
            @include flexCenter(column, center);
            padding: 10px 0;

            &::after {
                content: "";
                display: block;
                width: 80%;
                height: 2px;
                background-color: transparent;
            }

            span {
                padding: 0.2rem 0;
            }

            &.active {
                color: #1890ff;

                &::after {
                    background-color: #1890ff;
                }
            }
        }

        .menu-item img {
            width: 23px;
            height: 23px;
        }

        .menu-item .label {
            font-size: 14px;
        }
    }

    .bottom-icons {
        @include flexCenter(column, space-between);
        gap: 1rem;
        padding: 1rem 0;

        .icon-btn {
            cursor: pointer;
            background-color: #fff;

            img {
                width: 23px;
                height: 23px;
            }
        }


    }
}

/* 中间列表区域样式 */
.list-container {
    width: 320px;
    background-color: white;
    border-right: 1px solid #e8e8e8;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.list-header {
    padding: 10px;
    border-bottom: 1px solid #e8e8e8;
}

.search-box {
    position: relative;
}

.search-input {
    width: 100%;
    padding: 6px 20px;
    border: 1px solid #d9d9d9;
    border-radius: 20px;
    outline: none;
    transition: all 0.3s;
    font-size: 16px;
}

.search-input:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.list-content {
    flex: 1;
    overflow-y: auto;
}

.list-section {
    padding: 10px 0;
    overflow: hidden;
    max-width: 11.5rem;
}

.addFriend {
    height: 56px;
    gap: 0.5rem;
    @include flexCenter(row, center);

    &:hover {
        background-color: #e6f7ff;
    }

    span {
        font-size: 18px;
    }

    img {
        width: 25px;
        height: 25px;
    }
}

.countFriend {
    height: 24px;
    margin: 0.5rem 0;
    text-align: center;
    position: relative;

    span {
        font-size: 12px;
        max-width: 4rem;
        display: inline-block;
        overflow: hidden;
        height: 100%;
        text-align: center;
        line-height: 24px;
        color: #999;
    }

    &::after,
    &::before {
        content: "";
        position: absolute;
        top: 50%;
        display: block;
        width: 33%;
        height: 1px;
        background-color: #eee;
    }

    &::before {
        right: 0.5rem;
    }

    &::after {
        left: 0.5rem;
    }
}

.list-item {
    display: flex;
    padding: 12px 20px;
    cursor: pointer;
    transition: background-color 0.3s;

    .avatar {
        @include flexCenter(row, center);
        margin-right: 0.5rem;
        background-color: #ccc;

        .avatar-icon {
            width: 35px;
            height: 35px;
            border-radius: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }
    }

    &:hover {
        background-color: #f5f7fa;
    }

    &.active {
        background-color: #e6f7ff;
    }

    // 好友列表
    .friend-list {
        @include flexCenter(row, flex-start);
    }

    //消息列表
    .content {
        flex: 1;
        min-width: 0;
    }
}

.title {
    font-weight: 500;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
}

.preview,
.members {
    font-size: 14px;
    color: #666;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.time {
    font-size: 12px;
    color: #999;
}

/* 右侧详情区域样式 */
.detail-container {
    width: 100%;
    display: flex;
    flex-direction: column;

    .detail-content {
        width: 100%;
        height: 80vh;
        @include flexCenter(column, space-between);

        //右侧顶部标题栏
        .detail-header {
            display: flex;
            align-items: center;
            padding: 0.5rem;
            background-color: #fff;
            height: 58px;
            width: 100%;

            h2 {
                font-size: 18px;
            }
        }

        //右侧详情内容区
        .detail-section {
            height: 100%;
            width: 100%;
        }

        //输入框及聊天内容展示区域
        .chat-section {
            // background-color: rebeccapurple;
            @include flexCenter(column, space-between);

            //聊天内容展示区域
            .chatMessage {
                width: 100%;
            //     flex: 1;
            //     min-height: 0;
            //     overflow: hidden;
            }

            // //输入框
            .chatInput {
                width: 100%;
            //     flex-shrink: 0; //禁止收缩
            }
        }


    }



}

.empty-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;
}

.empty-icon {
    font-size: 64px;
    margin-bottom: 20px;
}

.empty-detail h3 {
    margin-bottom: 10px;
    font-weight: 500;
}




.detail-body {
    line-height: 1.6;
    padding: 1rem;
    padding-right: 3rem;

    .message-bubble {
        @include flexCenter(row, flex-start);
        align-items: flex-start;

        .time {
            font-size: 14px;
            font-weight: 700;
        }

        .selectedContent {
            background-color: #cfe7ff;
            padding: 0.2rem 0.5rem;
            font-size: 16px;
            border-radius: 0.2rem;
        }
    }
}

.info-card {
    @include flexCenter(column, flex-start);
    align-items: flex-start;
    gap: 0.5rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 16px;

    .email {
        @include flexCenter(row, flex-start);

        img {
            width: 20px;
            height: 20px;
        }
    }

    span {
        font-size: 18px;
    }

    .level {
        @include flexCenter(row, flex-start);

        .level-icon {
            width: 26px;
            height: 26px;
            margin-right: 0.5rem;
        }

        .sun {
            width: 18px;
            height: auto;
            animation: rotateAndScale 3.5s linear infinite;
        }

        @keyframes rotateAndScale {
            0% {
                transform: rotate(0deg) scale(1);
            }

            50% {
                transform: rotate(180deg) scale(0.95);
            }

            100% {
                transform: rotate(360deg) scale(1);
            }
        }

        div {
            @include flexCenter(row, center);
        }
    }

    strong {
        padding: 0 0.5rem;
    }

}

.group-info {
    margin-bottom: 20px;
}

.actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
}

.btn {
    padding: 8px 16px;
    background-color: #1890ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #40a9ff;
}

.btn.secondary {
    background-color: #f0f0f0;
    color: #333;
}

.btn.secondary:hover {
    background-color: #d9d9d9;
}

.reply-box {
    margin-top: 20px;
}

.reply-box textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    resize: vertical;
    margin-bottom: 12px;
}
</style>