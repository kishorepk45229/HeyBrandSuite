class PostCraftApp {
    constructor() {
        this.currentTemplate = null;
        this.brandSettings = this.loadBrandSettings();
        this.templates = this.getTemplateData();
        this.platformSizes = this.getPlatformSizes();
        
        this.init();
    }

    init() {
        console.log('Initializing PostCraft App...');
        this.setupNavigation();
        this.setupTemplates();
        this.setupBrandKit();
        this.setupEditor();
        this.setupEventListeners();
        
        // Load default section
        this.showSection('dashboard');
    }

    // Template Data
    getTemplateData() {
        return [
            {
                id: "business-1",
                category: "business",
                name: "Corporate Announcement",
                description: "Professional layout for business updates",
                gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                textColor: "#ffffff",
                title: "Big News!",
                subtitle: "We're expanding our services",
                content: "Exciting developments ahead for our company and valued clients."
            },
            {
                id: "business-2", 
                category: "business",
                name: "Team Introduction",
                description: "Introduce team members professionally",
                gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                textColor: "#ffffff",
                title: "Meet Our Team",
                subtitle: "Sarah Johnson, Marketing Director",
                content: "Leading innovative campaigns with creative excellence."
            },
            {
                id: "lifestyle-1",
                category: "lifestyle",
                name: "Daily Inspiration",
                description: "Motivational content for daily engagement",
                gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                textColor: "#2d3748",
                title: "Monday Motivation",
                subtitle: "Start your week strong",
                content: "Every small step counts towards your bigger goals."
            },
            {
                id: "lifestyle-2",
                category: "lifestyle",
                name: "Behind the Scenes",
                description: "Share authentic moments",
                gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                textColor: "#2d3748",
                title: "Behind the Scenes",
                subtitle: "A peek into our daily workflow",
                content: "Authenticity builds stronger connections with our audience."
            },
            {
                id: "promotional-1",
                category: "promotional",
                name: "Special Offer",
                description: "Eye-catching promotion design",
                gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                textColor: "#2d3748",
                title: "50% OFF",
                subtitle: "Limited Time Offer",
                content: "Don't miss out on our biggest sale of the year!"
            },
            {
                id: "promotional-2",
                category: "promotional",
                name: "Product Launch",
                description: "Announce new products effectively",
                gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
                textColor: "#ffffff",
                title: "New Product Launch",
                subtitle: "Innovation meets excellence",
                content: "Discover what's possible with our latest creation."
            },
            {
                id: "quotes-1",
                category: "quotes",
                name: "Motivational Quote",
                description: "Share inspiring messages",
                gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                textColor: "#ffffff",
                title: "\"Success is not final, failure is not fatal\"",
                subtitle: "- Winston Churchill",
                content: "It is the courage to continue that counts."
            },
            {
                id: "quotes-2",
                category: "quotes",
                name: "Wisdom Wednesday",
                description: "Weekly wisdom sharing",
                gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                textColor: "#ffffff",
                title: "\"Innovation distinguishes between a leader and a follower\"",
                subtitle: "- Steve Jobs",
                content: "Think different, make a difference."
            },
            {
                id: "product-1",
                category: "product",
                name: "Feature Highlight",
                description: "Showcase product features",
                gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                textColor: "#2d3748",
                title: "New Features",
                subtitle: "Enhanced user experience",
                content: "Discover powerful new capabilities in our latest update."
            },
            {
                id: "product-2",
                category: "product",
                name: "Product Benefits",
                description: "Highlight key benefits",
                gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                textColor: "#2d3748",
                title: "Why Choose Us?",
                subtitle: "Quality meets innovation",
                content: "Experience the difference with our premium solutions."
            },
            {
                id: "events-1",
                category: "events",
                name: "Event Invitation",
                description: "Invite attendees to events",
                gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                textColor: "#ffffff",
                title: "You're Invited!",
                subtitle: "Annual Company Meetup",
                content: "Join us for networking, insights, and great conversations."
            },
            {
                id: "events-2",
                category: "events",
                name: "Webinar Announcement",
                description: "Promote online events",
                gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                textColor: "#2d3748",
                title: "Free Webinar",
                subtitle: "Digital Marketing Trends 2025",
                content: "Learn from industry experts and grow your business."
            }
        ];
    }

    getPlatformSizes() {
        return {
            "instagram-square": { width: 1080, height: 1080, name: "Instagram Square" },
            "instagram-story": { width: 1080, height: 1920, name: "Instagram Story" },
            "facebook-post": { width: 1200, height: 630, name: "Facebook Post" },
            "linkedin-post": { width: 1200, height: 627, name: "LinkedIn Post" },
            "twitter-post": { width: 1600, height: 900, name: "Twitter Post" }
        };
    }

    // Navigation
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        console.log('Setting up navigation for', navItems.length, 'items');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const section = item.dataset.section;
                console.log('Navigation clicked:', section);
                this.showSection(section);
                
                // Update active states
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    showSection(sectionName) {
        console.log('Showing section:', sectionName);
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.classList.add('fade-in');
        } else {
            console.error('Section not found:', `${sectionName}-section`);
        }
    }

    // Templates
    setupTemplates() {
        this.renderTemplates();
        this.setupTemplateFilters();
    }

    renderTemplates(filter = 'all') {
        const templatesGrid = document.getElementById('templates-grid');
        if (!templatesGrid) {
            console.error('Templates grid not found');
            return;
        }

        const filteredTemplates = filter === 'all' 
            ? this.templates 
            : this.templates.filter(template => template.category === filter);

        console.log('Rendering templates:', filteredTemplates.length, 'for filter:', filter);

        templatesGrid.innerHTML = filteredTemplates.map(template => `
            <div class="template-card" data-template-id="${template.id}">
                <div class="template-preview" style="background: ${template.gradient};">
                    <div>
                        <h3 style="color: ${template.textColor};">${template.title}</h3>
                        <p style="color: ${template.textColor};">${template.subtitle}</p>
                    </div>
                </div>
                <div class="template-info">
                    <h4>${template.name}</h4>
                    <p>${template.description}</p>
                </div>
            </div>
        `).join('');

        // Add click handlers to template cards
        const templateCards = templatesGrid.querySelectorAll('.template-card');
        templateCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const templateId = card.dataset.templateId;
                console.log('Template card clicked:', templateId);
                this.selectTemplate(templateId);
            });
        });
    }

    setupTemplateFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        console.log('Setting up template filters for', filterBtns.length, 'buttons');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const category = btn.dataset.category;
                console.log('Filter clicked:', category);
                
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Render filtered templates
                this.renderTemplates(category);
            });
        });
    }

    selectTemplate(templateId) {
        const template = this.templates.find(t => t.id === templateId);
        if (!template) {
            console.error('Template not found:', templateId);
            return;
        }

        console.log('Template selected:', template);
        this.currentTemplate = template;
        this.showSection('editor');
        this.updateNavActiveState('editor');
        this.loadTemplateIntoEditor(template);
        this.showToast('Template loaded successfully!');
    }

    updateNavActiveState(section) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === section) {
                item.classList.add('active');
            }
        });
    }

    // Brand Kit
    setupBrandKit() {
        this.setupColorPickers();
        this.setupBrandKitSave();
        this.setupLogoUpload();
        this.loadBrandKitSettings();
    }

    setupColorPickers() {
        const colorInputs = document.querySelectorAll('input[type="color"]');
        console.log('Setting up color pickers for', colorInputs.length, 'inputs');
        
        colorInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const colorValue = e.target.nextElementSibling;
                if (colorValue && colorValue.classList.contains('color-value')) {
                    colorValue.textContent = e.target.value;
                }
                this.updatePreviewColors();
            });
        });
    }

    setupBrandKitSave() {
        const saveBtn = document.getElementById('save-brand-kit');
        if (saveBtn) {
            saveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.saveBrandSettings();
                this.showToast('Brand kit saved successfully!');
            });
        }
    }

    setupLogoUpload() {
        const uploadArea = document.querySelector('.logo-upload-area');
        const fileInput = document.getElementById('logo-upload');
        
        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', (e) => {
                e.preventDefault();
                fileInput.click();
            });
            
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.showToast('Logo uploaded successfully!');
                }
            });
        }
    }

    saveBrandSettings() {
        const settings = {
            primaryColor: document.getElementById('primary-color')?.value || '#6366f1',
            secondaryColor: document.getElementById('secondary-color')?.value || '#8b5cf6',
            accentColor: document.getElementById('accent-color')?.value || '#06b6d4',
            primaryFont: document.getElementById('primary-font')?.value || 'Inter',
            brandName: document.getElementById('brand-name')?.value || ''
        };
        
        this.brandSettings = settings;
        console.log('Brand settings saved:', settings);
    }

    loadBrandSettings() {
        return {
            primaryColor: '#6366f1',
            secondaryColor: '#8b5cf6',
            accentColor: '#06b6d4',
            primaryFont: 'Inter',
            brandName: 'PostCraft'
        };
    }

    loadBrandKitSettings() {
        if (this.brandSettings) {
            const primaryColorInput = document.getElementById('primary-color');
            const secondaryColorInput = document.getElementById('secondary-color');
            const accentColorInput = document.getElementById('accent-color');
            const primaryFontSelect = document.getElementById('primary-font');
            const brandNameInput = document.getElementById('brand-name');
            
            if (primaryColorInput) {
                primaryColorInput.value = this.brandSettings.primaryColor;
                const colorValue = primaryColorInput.nextElementSibling;
                if (colorValue) colorValue.textContent = this.brandSettings.primaryColor;
            }
            
            if (secondaryColorInput) {
                secondaryColorInput.value = this.brandSettings.secondaryColor;
                const colorValue = secondaryColorInput.nextElementSibling;
                if (colorValue) colorValue.textContent = this.brandSettings.secondaryColor;
            }
            
            if (accentColorInput) {
                accentColorInput.value = this.brandSettings.accentColor;
                const colorValue = accentColorInput.nextElementSibling;
                if (colorValue) colorValue.textContent = this.brandSettings.accentColor;
            }
            
            if (primaryFontSelect) {
                primaryFontSelect.value = this.brandSettings.primaryFont;
            }
            
            if (brandNameInput) {
                brandNameInput.value = this.brandSettings.brandName;
            }
        }
    }

    // Editor
    setupEditor() {
        this.setupTextEditor();
        this.setupPlatformSelector();
        this.setupEditorActions();
    }

    setupTextEditor() {
        const titleInput = document.getElementById('edit-title');
        const subtitleInput = document.getElementById('edit-subtitle');
        const contentInput = document.getElementById('edit-content');
        const fontSizeSelect = document.getElementById('font-size-select');
        const textColorInput = document.getElementById('text-color');

        console.log('Setting up text editor controls');

        [titleInput, subtitleInput, contentInput].forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    console.log('Text input changed:', input.id);
                    this.updatePreview();
                });
            }
        });

        if (fontSizeSelect) {
            fontSizeSelect.addEventListener('change', () => {
                console.log('Font size changed:', fontSizeSelect.value);
                this.updatePreview();
            });
        }

        if (textColorInput) {
            textColorInput.addEventListener('input', () => {
                console.log('Text color changed:', textColorInput.value);
                this.updatePreview();
            });
        }
    }

    setupPlatformSelector() {
        const platformSelect = document.getElementById('platform-select');
        if (platformSelect) {
            platformSelect.addEventListener('change', () => {
                console.log('Platform changed:', platformSelect.value);
                this.updatePreviewSize();
            });
        }
    }

    setupEditorActions() {
        const backBtn = document.getElementById('back-to-templates');
        const downloadBtn = document.getElementById('download-post');

        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Back to templates clicked');
                this.showSection('templates');
                this.updateNavActiveState('templates');
            });
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Download post clicked');
                this.downloadPost();
            });
        }
    }

    loadTemplateIntoEditor(template) {
        console.log('Loading template into editor:', template);
        
        const titleInput = document.getElementById('edit-title');
        const subtitleInput = document.getElementById('edit-subtitle');
        const contentInput = document.getElementById('edit-content');
        const textColorInput = document.getElementById('text-color');

        if (titleInput) titleInput.value = template.title;
        if (subtitleInput) subtitleInput.value = template.subtitle;
        if (contentInput) contentInput.value = template.content;
        if (textColorInput) textColorInput.value = template.textColor;

        // Update preview immediately
        setTimeout(() => {
            this.updatePreview();
        }, 100);
    }

    updatePreview() {
        const previewPost = document.getElementById('preview-post');
        const titleInput = document.getElementById('edit-title');
        const subtitleInput = document.getElementById('edit-subtitle');
        const contentInput = document.getElementById('edit-content');
        const fontSizeSelect = document.getElementById('font-size-select');
        const textColorInput = document.getElementById('text-color');

        if (!previewPost || !this.currentTemplate) {
            console.log('Cannot update preview - missing elements');
            return;
        }

        console.log('Updating preview');

        const postTitle = previewPost.querySelector('.post-title');
        const postSubtitle = previewPost.querySelector('.post-subtitle');
        const postText = previewPost.querySelector('.post-text');

        if (postTitle && titleInput) {
            postTitle.textContent = titleInput.value || this.currentTemplate.title;
        }
        if (postSubtitle && subtitleInput) {
            postSubtitle.textContent = subtitleInput.value || this.currentTemplate.subtitle;
        }
        if (postText && contentInput) {
            postText.textContent = contentInput.value || this.currentTemplate.content;
        }

        // Update styling
        const fontSize = fontSizeSelect?.value || '20px';
        const textColor = textColorInput?.value || this.currentTemplate.textColor;

        if (postTitle) postTitle.style.color = textColor;
        if (postSubtitle) postSubtitle.style.color = textColor;
        if (postText) postText.style.color = textColor;

        // Apply template background
        previewPost.style.background = this.currentTemplate.gradient;
    }

    updatePreviewSize() {
        const platformSelect = document.getElementById('platform-select');
        const previewPost = document.getElementById('preview-post');
        
        if (!platformSelect || !previewPost) return;

        const platform = platformSelect.value;
        console.log('Updating preview size for platform:', platform);
        
        // Remove all platform classes
        previewPost.className = 'preview-post';
        
        // Add new platform class
        previewPost.classList.add(platform);
    }

    updatePreviewColors() {
        // This would update preview with brand colors if needed
        // For now, keeping template's original colors
    }

    downloadPost() {
        // Simulate download process
        const downloadBtn = document.getElementById('download-post');
        if (downloadBtn) {
            const originalHtml = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            downloadBtn.disabled = true;
            
            setTimeout(() => {
                downloadBtn.innerHTML = originalHtml;
                downloadBtn.disabled = false;
                this.showToast('Post downloaded successfully!');
            }, 2000);
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Quick start button
        const quickStartBtn = document.querySelector('.quick-start-btn');
        if (quickStartBtn) {
            quickStartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Quick start clicked');
                this.showSection('templates');
                this.updateNavActiveState('templates');
            });
        }

        // Prevent form submissions
        document.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    // Utility Functions
    showToast(message, type = 'success') {
        console.log('Showing toast:', message);
        const toast = document.getElementById('toast');
        const toastMessage = document.querySelector('.toast-message');
        
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.remove('hidden');
            
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing PostCraft App');
    window.app = new PostCraftApp();
});