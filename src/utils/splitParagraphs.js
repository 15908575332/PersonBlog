// utils/textUtils.js
export function splitParagraphs(text) {
    // 处理空输入
    if (typeof text !== 'string' || text.trim() === '') return [];

    // 按换行符分割为初步段落
    const lines = text.split(/\n+/).map(line => line.trim());

    // 过滤空行
    const validLines = lines.filter(line => line !== '');

    // 按句号分割段落（处理边界情况）
    const paragraphs = [];
    for (const line of validLines) {
        // 按句号分割，但排除缩写词和数字小数点
        const parts = line.split(/(?<!\b[A-Za-z]{1,2})\.\s+/);
        paragraphs.push(...parts);
    }

    // 过滤空段落
    return paragraphs.filter(p => p !== '');
}