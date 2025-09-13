export function splitParagraphs(text) {
    if (typeof text !== 'string' || text.trim() === '') return [];

    // 合并项目符号行：将 "•\n内容" 合并为 "• 内容"
    const mergedText = text.replace(/•\s*\n\s*/g, '• ');

    // 按换行符分割为初步段落
    const lines = mergedText.split(/\n+/).map(line => line.trim());

    // 过滤空行
    const validLines = lines.filter(line => line !== '');

    // 只按中文句号分割段落
    const paragraphs = [];
    for (const line of validLines) {
        // 仅使用中文句号（。）作为分割点
        const parts = line.split(/。\s*/);
        paragraphs.push(...parts);
    }

    // 过滤空段落
    return paragraphs.filter(p => p !== '');
}