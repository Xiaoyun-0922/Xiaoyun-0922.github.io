document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const chaptersContainer = document.getElementById('chaptersContainer');
    const addChapterBtn = document.getElementById('addChapter');
    const saveAllBtn = document.getElementById('saveAll');
    const modal = document.getElementById('addChapterModal');
    const closeBtn = document.querySelector('.close');
    const confirmAddChapterBtn = document.getElementById('confirmAddChapter');
    const chapterNameInput = document.getElementById('chapterName');
    
    // 示例数据 - 可以从后端API获取
    let chapters = [
        { id: 1, name: '第一章: HTML基础', homeworks: ['创建个人主页', '完成表单练习'] },
        { id: 2, name: '第二章: CSS样式', homeworks: ['设计响应式导航栏', '实现卡片布局'] },
        { id: 3, name: '第三章: JavaScript基础', homeworks: ['实现计算器功能', '制作轮播图'] }
    ];
    
    // 初始化渲染章节
    renderChapters();
    
    // 添加章节按钮点击事件
    addChapterBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    // 关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 确认添加章节
    confirmAddChapterBtn.addEventListener('click', function() {
        const chapterName = chapterNameInput.value.trim();
        if (chapterName) {
            const newChapter = {
                id: Date.now(), // 使用时间戳作为临时ID
                name: chapterName,
                homeworks: []
            };
            chapters.push(newChapter);
            renderChapters();
            chapterNameInput.value = '';
            modal.style.display = 'none';
        }
    });
    
    // 保存所有作业
    saveAllBtn.addEventListener('click', function() {
        alert('所有作业已保存！');
        // 这里可以添加实际的保存逻辑，如发送到后端API
        console.log('保存的章节数据:', chapters);
    });
    
    // 渲染章节
    function renderChapters() {
        chaptersContainer.innerHTML = '';
        
        chapters.forEach(chapter => {
            const chapterCard = document.createElement('div');
            chapterCard.className = 'chapter-card';
            chapterCard.dataset.id = chapter.id;
            
            chapterCard.innerHTML = `
                <div class="chapter-header">
                    <h3 class="chapter-title">${chapter.name}</h3>
                    <button class="delete-chapter">×</button>
                </div>
                <div class="homework-list" data-chapter-id="${chapter.id}">
                    ${chapter.homeworks.map((hw, index) => `
                        <div class="homework-item" data-index="${index}">
                            <input type="text" value="${hw}" placeholder="作业内容">
                            <button class="delete-homework">删除</button>
                        </div>
                    `).join('')}
                </div>
                <button class="add-homework">添加作业</button>
            `;
            
            chaptersContainer.appendChild(chapterCard);
        });
        
        // 添加删除章节事件
        document.querySelectorAll('.delete-chapter').forEach(btn => {
            btn.addEventListener('click', function() {
                const chapterId = parseInt(this.closest('.chapter-card').dataset.id);
                chapters = chapters.filter(c => c.id !== chapterId);
                renderChapters();
            });
        });
        
        // 添加删除作业事件
        document.querySelectorAll('.delete-homework').forEach(btn => {
            btn.addEventListener('click', function() {
                const chapterId = parseInt(this.closest('.homework-list').dataset.chapterId);
                const homeworkIndex = parseInt(this.closest('.homework-item').dataset.index);
                
                const chapter = chapters.find(c => c.id === chapterId);
                if (chapter) {
                    chapter.homeworks.splice(homeworkIndex, 1);
                    renderChapters();
                }
            });
        });
        
        // 添加作业输入框事件
        document.querySelectorAll('.homework-item input').forEach(input => {
            input.addEventListener('change', function() {
                const chapterId = parseInt(this.closest('.homework-list').dataset.chapterId);
                const homeworkIndex = parseInt(this.closest('.homework-item').dataset.index);
                
                const chapter = chapters.find(c => c.id === chapterId);
                if (chapter) {
                    chapter.homeworks[homeworkIndex] = this.value;
                }
            });
        });
        
        // 添加新作业按钮事件
        document.querySelectorAll('.add-homework').forEach(btn => {
            btn.addEventListener('click', function() {
                const chapterId = parseInt(this.previousElementSibling.dataset.chapterId);
                const chapter = chapters.find(c => c.id === chapterId);
                
                if (chapter) {
                    chapter.homeworks.push('');
                    renderChapters();
                }
            });
        });
    }
});
