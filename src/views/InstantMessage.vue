<template>
    <div style="overflow: hidden;" class="container">
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
                    <div class="icon-btn" @click="handOpenMoments">
                        <img src="@/assets/icon/instantMessaging/icons8-aperture-64.png" alt="moments">
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
                        <div v-for="session in chatSessions" :key="session.session_id"
                            :class="['list-item', { active: selectedItem?.session_id === session.session_id }]"
                            @click="selectChatSession(session)"
                            @contextmenu.prevent="showChatContextMenu(session, $event)">
                            <div class="avatar">
                                <img :src="session.other_avatar" @error="handleAvatarError" alt="avatar"
                                    class="avatar-icon" />
                            </div>
                            <div class="content">
                                <p class="title">{{ session.other_username }}</p>
                                <p class="preview">{{ session.last_msg_content }}</p>
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
                            <ChatMessage :messages="selectedItem.messages"
                                :show-sender-name="selectedItem.type === 'group'" ref="chatMessageRef" />
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
                                <button class="btn" @click.stop="startChat(selectedItem)">发送消息

                                </button>
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

            <!-- 右键菜单 -->
            <div v-if="chatContextMenu.visible" class="context-menu chat-context-menu"
                :style="{ left: chatContextMenu.x + 'px', top: chatContextMenu.y + 'px' }">
                <div class="menu-item" @click="deleteChatSession">
                    <i>🗑️</i> 删除会话
                </div>
                <div class="menu-item" @click="markAsReadChatSession">
                    <i>📨</i> 标记为已读
                </div>
                <div class="menu-item" @click="clearChatHistory">
                    <i>🧹</i> 清空聊天记录
                </div>
            </div>
        </div>

        <!-- 朋友圈 -->
        <div class="moments">
            <ModalBox :isVisible="showModal" @close="handCloseMoments" animationType="clipRectSpIn">
                <GridImageAnime></GridImageAnime>
            </ModalBox>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance, nextTick, onUnmounted } from 'vue'

import systemIcon from '@/assets/icon/instantMessaging/icons8-system-40.png'
import chatMessageIcon from '@/assets/icon/instantMessaging/icons8-message-64.png'
import groupMessageIcon from '@/assets/icon/instantMessaging/icons8-group-50.png'
import friendIcon from '@/assets/icon/instantMessaging/icons8-people-48.png'
import { message } from 'ant-design-vue';

import ChatMessage from '@/components/InstantMessage/ChatMessage.vue'
import ChatInput from '@/components/InstantMessage/ChatInput.vue'

import GridImageAnime from '@/components/GridImageAnime/index.vue'
import ModalBox from '@/components/ModalBox/index.vue'

const instance = getCurrentInstance();
const $http = instance.appContext.config.globalProperties.$http;

import { useAuthStore } from "@/store/auth";
const userStore = useAuthStore();

import { useRouter } from 'vue-router';
const route = useRouter();

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


/** ------------------------ 系统 ------------------------ */
const systemMessages = ref([]); //系统消息列表
const getSystemNotice = async () => { //获取所有系统通知
    try {
        const response = await $http.get('/instansMessaging/im_system_notifications');
        systemMessages.value = response.result;
    } catch (error) {
        console.error('获取系统通知失败:', error);
    }
};

const filteredSystemMessages = computed(() => { // 系统消息过滤逻辑（用作搜索用，后期改为sql查询）
    if (!searchQuery.value) return systemMessages.value
    return systemMessages.value.filter(msg =>
        msg.title.includes(searchQuery.value) ||
        msg.preview.includes(searchQuery.value)
    )
})

/** ------------------------ 聊天 ------------------------ */
const chatSessions = ref([]); //会话列表
const chatContextMenu = ref({ //右键菜单配置项
    visible: false,
    x: 0,
    y: 0,
    session: null
})

// 显示聊天会话右键菜单
function showChatContextMenu(session, event) {
    event.preventDefault();
    event.stopPropagation(); //阻止事件冒泡，导致visible值马上变化
    chatContextMenu.value = {
        visible: true,
        x: event.clientX,
        y: event.clientY,
        session: session
    };
    // 点击非右键菜单关闭菜单
    nextTick(() => {
        document.addEventListener('click', hideChatContextMenu);
        document.addEventListener('contextmenu', hideChatContextMenuOnRightClick);
    });
}
// 隐藏聊天会话右键菜单
function hideChatContextMenu() {
    chatContextMenu.value.visible = false;
    document.removeEventListener('click', hideChatContextMenu);
    document.removeEventListener('contextmenu', hideChatContextMenuOnRightClick);
}

// 右键点击其他地方关闭菜单
function hideChatContextMenuOnRightClick(e) {
    if (!document.querySelector('.chat-context-menu')?.contains(e.target)) {
        hideChatContextMenu();
    }
}
/**
 * 与指定用户/群组开始聊天（切换到聊天会话列表）
 * @param {Object} target - 目标用户对象
 */
async function startChat(target) {
    try {
        // 1. 调用后端API创建会话
        const response = await $http.post('/instansMessaging/createMssageSession', {
            otherUserId: target.user_id // 使用后端返回的用户ID字段
        });
        if (response.code !== 200) {
            throw new Error(response.message || '创建会话失败');
        }

        const sessionData = response.data;

        // 2. 立即刷新会话列表（获取最新的会话数据，包括对方用户信息）
        await getAllSessions();

        // 3. 从更新后的会话列表中查找新创建的会话
        const newSession = chatSessions.value.find(session =>
            session.session_id === sessionData.session_id
        );

        if (newSession) {
            // 4. 选中新创建的会话
            selectChatSession(newSession);

            // 5. 切换到聊天界面
            activeMenu.value = 'chat';
        } else {
            console.warn('新创建的会话未在列表中找到');
        }

    } catch (error) {
        console.error('创建聊天会话失败:', error);
        if (error.response?.data?.message) {
            // 使用您项目中的消息提示组件
            message.error(`创建会话失败: ${error.response.data.message}`);
        } else {
            message.error('网络错误，请检查连接后重试');
        }
    }
}

// 获取当前用户所有会话列表
async function getAllSessions() {
    try {
        const response = await $http.get(`/instansMessaging/getMessageSessions`);
        // 对返回的数据进行标准化处理
        chatSessions.value = response.data.map(session => {
            // 确保头像路径有效，如果为空则使用默认头像
            let avatarUrl = session.other_avatar;
            if (!avatarUrl || avatarUrl === 'null' || avatarUrl === 'undefined') {
                avatarUrl = '/src/assets/icon/instantMessaging/icons8-people-48.png';
            }

            // 确保会话ID格式正确
            const sessionId = session.session_id ? `session_${session.session_id}` : `session_${Date.now()}`;

            return {
                id: sessionId, // 前端使用的ID
                session_id: session.session_id, // 后端会话ID
                other_user_id: session.other_user_id, // 对方用户ID
                other_username: session.other_username || '未知用户',
                other_avatar: avatarUrl,
                last_msg_content: session.last_msg_content || '',
                unreadCount: session.unread_count || 0,
                time: session.last_msg_time || new Date().toISOString(),
                // 添加其他必要字段
                name: session.other_username || '未知用户',
                preview: session.last_msg_content || '',
                type: 'friend'
            };
        });
    } catch (error) {
        console.error('获取所有会话失败:', error);
        throw error;
    }
}

/**
 * 聊天记录推送（会话表更新最后一次聊天内容已包含在此api中）
 */
async function handleSendMessage(messageData) {
    if (!selectedItem.value) return;

    try {
        // 构建消息内容
        let content = '';
        let msgType = 1; // 默认为文本消息

        if (messageData.image) {
            // 图片消息处理
            msgType = 2;
            content = '[图片]';
        } else if (messageData.mixedContent && messageData.mixedContent.length > 0) {
            // 处理混合内容
            content = generatePreviewFromMixedContent(messageData.mixedContent);
        } else {
            alert('消息内容不能为空');
            return;
        }


        // 调用后端API发送消息
        const response = await $http.post('/instansMessaging/sendMessage', {
            session_id: selectedItem.value.session_id,
            receiver_id: selectedItem.value.other_user_id,
            msg_type: msgType,
            content: content,
            file_url: messageData.image || null
        });

        if (response.code !== 200) {
            throw new Error(response.message);
        }

        const newMessage = response.data;

        // 更新前端消息列表
        if (!selectedItem.value.messages) {
            selectedItem.value.messages = [];
        }

        const formattedMessage = {
            id: newMessage.msg_id,
            sender: "你",
            mixedContent: messageData.mixedContent || [],
            image: messageData.image || null,
            time: newMessage.created_at,
            isMine: true,
            avatar: userStore.user.avatarUrl,
            // 添加后端返回的原始数据
            rawMessage: newMessage
        };

        selectedItem.value.messages.push(formattedMessage);

        // 更新会话预览
        updateSessionPreview(selectedItem.value.session_id, content);

        // 滚动到底部
        nextTick(() => {
            chatMessageRef.value?.forceScrollToBottom(true);
        });

    } catch (error) {
        console.error('发送消息失败:', error);
        // 使用项目中的消息提示组件
        message.error('发送消息失败，请重试');
    }
}

// 更新会话预览的
function updateSessionPreview(sessionId, previewText) {
    const sessionIndex = chatSessions.value.findIndex(session =>
        session.session_id === sessionId
    );

    if (sessionIndex !== -1) {
        chatSessions.value[sessionIndex].last_msg_content = previewText;
        chatSessions.value[sessionIndex].last_msg_time = new Date().toISOString();

        // 置顶当前会话
        const session = chatSessions.value.splice(sessionIndex, 1)[0];
        chatSessions.value.unshift(session);
    }
}

// 替换原有的 selectChatSession 函数
async function selectChatSession(session) {
    try {
        // 获取后端聊天记录
        const response = await $http.get(
            `/instansMessaging/messages/${session.session_id}`
        );

        if (response.code !== 200) {
            throw new Error(response.message);
        }

        // 转换后端消息格式为前端格式
        const messages = response.data.messages.map(msg => ({
            id: msg.msg_id,
            sender: msg.sender_id === userStore.user.userId ? "你" : msg.sender_name,
            mixedContent: parseMessageContent(msg),
            time: msg.created_at,
            isMine: msg.sender_id === userStore.user.userId,
            avatar: msg.sender_avatar || '/src/assets/icon/instantMessaging/icons8-people-48.png',
            rawMessage: msg
        }));

        selectedItem.value = {
            ...session,
            messages: messages
        };

        // 标记消息为已读
        await markMessagesAsRead(session.session_id);

        // 滚动到底部
        nextTick(() => {
            setTimeout(() => {
                if (chatMessageRef.value) {
                    chatMessageRef.value.forceScrollToBottom();
                }
            }, 50);
        });

    } catch (error) {
        console.error('获取聊天记录失败:', error);
        message.error('加载聊天记录失败');
    }
}

// 新增消息内容解析函数
function parseMessageContent(message) {
    if (message.msg_type === 1) { // 文本消息
        return [{ type: 'text', content: message.content }];
    } else if (message.msg_type === 2) { // 图片消息
        return [{ type: 'image', content: message.file_url }];
    }
    // 其他消息类型...
    return [{ type: 'text', content: message.content }];
}

// 新增标记消息为已读的函数
async function markMessagesAsRead(sessionId) {
    try {
        // 这里可以批量标记会话中的所有未读消息为已读
        await $http.put(`/instansMessaging/sessions/${sessionId}/read-all`);

        // 更新会话列表的未读计数
        const sessionIndex = chatSessions.value.findIndex(s =>
            s.session_id === sessionId
        );
        if (sessionIndex !== -1) {
            chatSessions.value[sessionIndex].unread_count = 0;
        }
    } catch (error) {
        console.error('标记消息已读失败:', error);
    }
}
// 删除聊天会话
async function deleteChatSession() {
    if (!chatContextMenu.value.session) return;

    const session = chatContextMenu.value.session;
    try {
        // 调用您提供的API接口
        const response = await $http.delete(`/instansMessaging/${session.session_id}`);

        if (response.code === 200) {
            // 从会话列表中移除
            const sessionIndex = chatSessions.value.findIndex(s =>
                s.session_id === session.session_id
            );

            if (sessionIndex !== -1) {
                chatSessions.value.splice(sessionIndex, 1);
            }

            // 如果当前选中的是正在删除的会话，清空选中状态
            if (selectedItem.value && selectedItem.value.session_id === session.session_id) {
                selectedItem.value = null;
            }

            // 使用项目中的消息提示组件
            message.success('会话删除成功');
        } else {
            message.error(response.message || '删除会话失败');
        }
    } catch (error) {
        console.error('删除会话失败:', error);
        message.error('删除会话失败，请重试');
    } finally {
        hideChatContextMenu();
    }
}

/** ------------------------ 好友 ------------------------ */
const friends = ref([]); //列表
const friendCounts = ref(0); //数量

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
const pendingFriends = computed(() => {
    return friends.value?.filter(friend => friend.friend_status === 1); //筛选状态为1的好友
});

const filteredFriends = computed(() => { //（用作搜索用，后期改为sql查询）
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

/** ------------------------ 群聊 ------------------------ */
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
const filteredGroups = computed(() => { // 群组列表过滤逻辑（用作搜索用，后期改为sql查询）
    if (!searchQuery.value) return groups.value
    return groups.value.filter(group =>
        group.name.includes(searchQuery.value)
    )
})

/** ------------------------ 预览生成 ------------------------ */
function generatePreviewFromMixedContent(mixedContent, options = {}) {
    if (!mixedContent || mixedContent.length === 0) return '';

    const {
        maxLength = 50, // 最大预览长度
        truncateSuffix = '...', // 截断后缀
    } = options;

    let preview = mixedContent.map(item => {
        if (item.type === 'text') {
            return item.content;
        } else if (item.type === 'emoji') {
            return '[表情]' + `[${item.id}]`;
        } else if (item.type === 'image') {
            return '[图片]';
        } else if (item.type === 'file') {
            return '[文件]';
        }
        return '';
    }).filter(text => text.trim() !== '').join(' ');

    // 截断过长的预览
    if (preview.length > maxLength) {
        preview = preview.substring(0, maxLength) + truncateSuffix;
    }

    return preview.trim();
}

// 模拟回复，支持表情
function simulateReply(chatId, originalMessage) {
    setTimeout(() => {
        const isImage = originalMessage.image;
        const hasMixedContent = originalMessage.mixedContent && originalMessage.mixedContent.length > 0;

        let replyMixedContent = [];

        if (isImage) {
            // 图片回复逻辑
        } else if (hasMixedContent) {
            // 复制混合内容
            replyMixedContent = JSON.parse(JSON.stringify(originalMessage.mixedContent));
        }

        const replyMessage = {
            id: Date.now() + 1,
            sender: chatId.startsWith('friend_')
                ? chatSessions.value.find(s => s.id === chatId)?.name || '好友'
                : '群成员',
            mixedContent: replyMixedContent,
            image: isImage ? '/src/assets/icon/instantMessaging/icons8-image-64.png' : null,
            time: new Date().toISOString(),
            isMine: false,
            avatar: chatId.startsWith('friend_')
                ? chatSessions.value.find(s => s.id === chatId)?.avatar
                : '/src/assets/icon/instantMessaging/icons8-group-64.png'
        };

        chatMessages.value[chatId].push(replyMessage);

        // 更新会话预览
        const sessionIndex = chatSessions.value.findIndex(session => session.id === chatId);
        if (sessionIndex !== -1) {
            let previewText = '';
            if (isImage) {
                previewText = '[图片]';
            } else if (hasMixedContent) {
                previewText = generatePreviewFromMixedContent(originalMessage.mixedContent, {
                    maxLength: 30,
                });
            }

            chatSessions.value[sessionIndex].preview = previewText;
            chatSessions.value[sessionIndex].time = replyMessage.time;
            chatSessions.value[sessionIndex].unreadCount += 1;
        }

        // 如果当前正在查看这个聊天，更新显示
        if (selectedItem.value?.id === chatId) {
            selectedItem.value.messages = [...chatMessages.value[chatId]];
            nextTick(() => {
                chatMessageRef.value?.forceScrollToBottom(true);
            });
        }
    }, 2000);
}

/** ------------------------ 公共属性 ------------------------ */
const chatMessageRef = ref(null); //message实际渲染容器
const showModal = ref(false); //朋友圈状态控制

const handleAvatarError = (event) => { //头像加载失败处理
    event.target.src = 'src/assets/icon/instantMessaging/icons8-people-48.png'; //替换为默认头像
};

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
function switchMenu(menuId) { //选中项切换/菜单切换
    activeMenu.value = menuId
    selectedItem.value = null
    searchQuery.value = ''
}

function selectItem(item) { //选中项详情展示
    selectedItem.value = item;
    item.isRead = true;
}
const handOpenMoments = (() => { //打开朋友圈
    showModal.value = true;
})
const handCloseMoments = (() => { //关闭朋友圈
    showModal.value = false;
})
function handleSettings() { //设置按钮跳转个人中心
    route.push('/personalCenter');
}

onMounted(async () => {
    await getSystemNotice();
    await getFriendsList();
    await getAllSessions();
});
// 在组件卸载时清理事件监听器
onUnmounted(() => {
    document.removeEventListener('click', hideChatContextMenu);
    document.removeEventListener('contextmenu', hideChatContextMenuOnRightClick);
});
</script>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'gtpy', 'Microsoft YaHei', sans-serif;
}

.container {
    background-image: url('@/assets/img/instantMessage/fH2rlwC8A.png');
    background-size: cover;
    position: relative;

    .moments {
        position: absolute;
        z-index: 999;
        top: 0;
        left: 0;
    }
}

.app-container {
    width: 60vw;
    height: 80vh;
    margin: 10vh auto;
    color: #333;
    box-shadow: $shadow-card;
    border-radius: 0.4rem;
    background-color: $general-white;
    @include flexCenter(row, flex-start);
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
    max-width: 320px;
    overflow: hidden;
    background-color: white;
    border-right: 1px solid #e8e8e8;
    display: flex;
    flex-direction: column;
    height: 100%;

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
        position: relative;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.02);
            opacity: 0;
            transition: opacity 0.2s;
            pointer-events: none;
        }

        &:hover::after {
            opacity: 1;
        }

        .avatar {
            @include flexCenter(row, center);
            margin-right: 0.5rem;
            background-color: #ccc;
            width: 35px;
            height: 35px;
            border-radius: 0.2rem;
            // overflow: hidden;

            .avatar-icon {
                width: 100%;
                height: 100%;
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
}

/* 右侧详情区域样式 */
.detail-container {
    width: 100%;
    height: 100%;
    height: inherit;
    @include flexCenter(column, flex-start);

    .detail-content {
        width: 100%;
        height: 100%;

        //右侧顶部标题栏
        .detail-header {
            padding: 0.5rem;
            height: 56px;
            width: 100%;
            display: flex;
            align-items: center;

            h2 {
                font-size: 18px;
                line-height: 56px;
            }
        }


        //右侧详情内容区
        .detail-section {
            height: 100%;
            width: 100%;

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
                        width: 18px;
                        height: 18px;
                        margin-bottom: 0.2rem;
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
        }

        .chat-section {
            height: calc(100% - 56px) !important;
            @include flexCenter (column, space-between);
            background-color: #f8f8f8;

            .chatMessage {
                overflow-y: hidden;
                width: 100%;
            }

            .chatInput {
                width: 100%;
                background-color: $general-white;
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

        .empty-icon {
            font-size: 64px;
            margin-bottom: 20px;
        }

        h3 {
            margin-bottom: 10px;
            font-weight: 500;
        }
    }
}

// 右键菜单
.chat-context-menu {
    position: fixed;
    z-index: 1000;
    background: white;
    border-radius: 8px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    min-width: 150px;
    padding: 8px 0;

    .menu-item {
        padding: 10px 16px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 14px;

        i {
            margin-right: 8px;
            font-size: 16px;
        }

        &:hover {
            background: #f5f7ff;
        }

        &:first-child {
            color: #ff4757;

            &:hover {
                background: #fff0f0;
            }
        }
    }
}
</style>