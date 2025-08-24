// BrandSuite Pro Application Logic

// Application data from the provided JSON
const appData = {
  pricingPlans: [
    {
      name: "Starter",
      price: { monthly: 9, annual: 96 },
      posts: "5-10 posts/month",
      features: ["Basic templates", "1 brand kit", "Standard export", "Email support"],
      popular: false
    },
    {
      name: "Professional", 
      price: { monthly: 24, annual: 240 },
      posts: "10-20 posts/month",
      features: ["Premium templates", "3 brand kits", "HD export", "Priority support", "Team collaboration"],
      popular: true
    },
    {
      name: "Business",
      price: { monthly: 49, annual: 490 },
      posts: "30-40 posts/month", 
      features: ["Unlimited templates", "10 brand kits", "4K export", "Advanced analytics", "API access"],
      popular: false
    },
    {
      name: "Enterprise",
      price: { monthly: "Custom", annual: "Custom" },
      posts: "Unlimited posts",
      features: ["White-label solution", "Unlimited brand kits", "Custom integrations", "Dedicated support", "SLA guarantee"],
      popular: false
    }
  ],
  features: [
    {
      icon: "🎨",
      title: "Brand Kit Management", 
      description: "Store and manage your logos, colors, fonts, and brand guidelines in one centralized hub"
    },
    {
      icon: "🖼️",
      title: "Layer-Based Editor",
      description: "Professional editing tools with full layer control, visibility toggles, and advanced manipulation"
    },
    {
      icon: "📱",
      title: "Multi-Platform Support",
      description: "Templates optimized for Instagram, Facebook, Twitter, LinkedIn, and more social platforms"
    },
    {
      icon: "👥", 
      title: "Team Collaboration",
      description: "Share brand kits and collaborate on designs with team members and stakeholders"
    },
    {
      icon: "⚡",
      title: "Brand Consistency", 
      description: "Ensure consistent branding across all your social media content with automated checks"
    },
    {
      icon: "🚀",
      title: "Quick Export",
      description: "Export designs in multiple formats and sizes optimized for each social media platform"
    }
  ],
  socialPlatforms: [
    { name: "Instagram Post", dimensions: "1080x1080", category: "social" },
    { name: "Instagram Story", dimensions: "1080x1920", category: "social" },
    { name: "Facebook Post", dimensions: "1200x630", category: "social" },
    { name: "Twitter Header", dimensions: "1500x500", category: "social" },
    { name: "LinkedIn Banner", dimensions: "1584x396", category: "professional" },
    { name: "YouTube Thumbnail", dimensions: "1280x720", category: "video" }
  ],
  templateCategories: [
    { name: "Promotional", count: 45, description: "Marketing and sales focused designs" },
    { name: "Announcements", count: 32, description: "News and update templates" },
    { name: "Quotes", count: 28, description: "Inspirational and motivational quotes" },
    { name: "Events", count: 22, description: "Event promotion and invitation designs" },
    { name: "Educational", count: 18, description: "Informational and learning content" }
  ]
};

// Application State
let currentUser = null;
let currentBrandKit = null;
let isAnnualBilling = false;
let currentView = 'landing';
let currentDesign = null;
let canvasLayers = [];
let selectedLayer = null;
let brandSetupStep = 1;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing BrandSuite Pro...');
  initializeApp();
  populateFeatures();
  populatePricing();
  setupEventListeners();
  setupBrandSetupWizard();
});

function initializeApp() {
  // Check if user is returning (simulate session)
  const userData = getSimulatedUserData();
  if (userData) {
    currentUser = userData.user;
    currentBrandKit = userData.brandKit;
    showDashboard();
  } else {
    showLandingPage();
  }
}

// Simulated user data (since we can't use localStorage)
function getSimulatedUserData() {
  // Return null to simulate no existing session
  return null;
}

function saveUserData(user, brandKit) {
  // Simulate saving data (in real app would use backend API)
  currentUser = user;
  currentBrandKit = brandKit;
}

// Populate Features Section
function populateFeatures() {
  const featuresGrid = document.getElementById('featuresGrid');
  if (!featuresGrid) return;
  
  featuresGrid.innerHTML = appData.features.map(feature => `
    <div class="feature-card">
      <span class="feature-icon">${feature.icon}</span>
      <h3 class="feature-title">${feature.title}</h3>
      <p class="feature-description">${feature.description}</p>
    </div>
  `).join('');
}

// Populate Pricing Section
function populatePricing() {
  const pricingGrid = document.getElementById('pricingGrid');
  if (!pricingGrid) return;
  
  renderPricingCards();
}

function renderPricingCards() {
  const pricingGrid = document.getElementById('pricingGrid');
  if (!pricingGrid) return;
  
  pricingGrid.innerHTML = appData.pricingPlans.map(plan => {
    const price = typeof plan.price.monthly === 'number' 
      ? (isAnnualBilling ? plan.price.annual : plan.price.monthly)
      : plan.price.monthly;
    
    const period = typeof price === 'number' 
      ? (isAnnualBilling ? '/year' : '/month')
      : '';
    
    return `
      <div class="pricing-card ${plan.popular ? 'popular' : ''}">
        <h3 class="plan-name">${plan.name}</h3>
        <div class="plan-price">
          ${typeof price === 'number' ? `<span class="currency">$</span>${price}` : price}
          <span class="period">${period}</span>
        </div>
        <p class="plan-posts">${plan.posts}</p>
        <ul class="plan-features">
          ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <button class="btn btn--primary btn--full-width plan-select-btn" data-plan="${plan.name}">
          ${plan.name === 'Enterprise' ? 'Contact Sales' : 'Choose Plan'}
        </button>
      </div>
    `;
  }).join('');
  
  // Add event listeners to plan buttons
  document.querySelectorAll('.plan-select-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const planName = this.getAttribute('data-plan');
      selectPlan(planName);
    });
  });
}

// Event Listeners Setup
function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Navigation - Use event delegation for better reliability
  document.addEventListener('click', function(e) {
    // Handle navigation toggle
    if (e.target.matches('#navToggle, #navToggle *')) {
      e.preventDefault();
      toggleMobileMenu();
      return;
    }
    
    // Handle login button
    if (e.target.matches('#loginBtn')) {
      e.preventDefault();
      showModal('login');
      return;
    }
    
    // Handle get started buttons
    if (e.target.matches('#getStartedBtn, #heroGetStarted')) {
      e.preventDefault();
      showModal('signup');
      return;
    }
    
    // Handle hero login button
    if (e.target.matches('#heroLogin')) {
      e.preventDefault();
      showModal('login');
      return;
    }
    
    // Handle modal close buttons
    if (e.target.matches('#loginClose')) {
      hideModal('login');
      return;
    }
    
    if (e.target.matches('#signupClose')) {
      hideModal('signup');
      return;
    }
    
    if (e.target.matches('#templateClose')) {
      hideModal('template');
      return;
    }
    
    // Handle modal switching
    if (e.target.matches('#showSignup')) {
      e.preventDefault();
      hideModal('login');
      showModal('signup');
      return;
    }
    
    if (e.target.matches('#showLogin')) {
      e.preventDefault();
      hideModal('signup');
      showModal('login');
      return;
    }
    
    // Handle logout
    if (e.target.matches('#logoutBtn')) {
      e.preventDefault();
      handleLogout();
      return;
    }
    
    // Handle dashboard navigation
    if (e.target.matches('.nav-item[data-view]')) {
      e.preventDefault();
      const view = e.target.getAttribute('data-view');
      switchDashboardView(view);
      
      // Update active state
      document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
      e.target.classList.add('active');
      return;
    }
    
    // Handle editor controls
    if (e.target.matches('#backToDashboard')) {
      showDashboard();
      return;
    }
    
    // Handle editor tabs
    if (e.target.matches('.tab-btn')) {
      const tabName = e.target.getAttribute('data-tab');
      switchEditorTab(tabName);
      return;
    }
    
    // Handle element buttons
    if (e.target.matches('.element-btn')) {
      const text = e.target.textContent.toLowerCase();
      if (text.includes('text')) addTextElement();
      else if (text.includes('shape')) addShapeElement();
      return;
    }
    
    // Handle editor action buttons
    if (e.target.matches('#saveBtn')) {
      saveDesign();
      return;
    }
    
    if (e.target.matches('#exportBtn')) {
      exportDesign();
      return;
    }
    
    // Close modals on outside click
    if (e.target.matches('.modal')) {
      hideAllModals();
      return;
    }
  });
  
  // Smooth scrolling for navigation links
  document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
      const targetId = e.target.getAttribute('href');
      if (targetId !== '#' && targetId !== '#pricing' && targetId !== '#features') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (targetId === '#features') {
        e.preventDefault();
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (targetId === '#pricing') {
        e.preventDefault();
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });
  
  // Form submissions
  document.addEventListener('submit', function(e) {
    if (e.target.matches('#loginForm')) {
      e.preventDefault();
      handleLogin(e);
      return;
    }
    
    if (e.target.matches('#signupForm')) {
      e.preventDefault();
      handleSignup(e);
      return;
    }
    
    if (e.target.matches('#brandSetupForm')) {
      e.preventDefault();
      handleBrandSetup(e);
      return;
    }
  });
  
  // Billing toggle - use setTimeout to ensure DOM is ready
  setTimeout(() => {
    const billingToggle = document.getElementById('billingToggle');
    if (billingToggle) {
      billingToggle.addEventListener('click', function() {
        isAnnualBilling = !isAnnualBilling;
        this.classList.toggle('active', isAnnualBilling);
        renderPricingCards();
      });
    }
  }, 100);
  
  // Canvas interaction
  setTimeout(() => {
    const designCanvas = document.getElementById('designCanvas');
    if (designCanvas) {
      setupCanvasInteractions();
    }
  }, 100);
  
  setupBrandSetupNavigation();
}

function setupBrandSetupNavigation() {
  // Brand setup navigation - use event delegation
  document.addEventListener('click', function(e) {
    if (e.target.matches('#nextStep')) {
      nextBrandStep();
      return;
    }
    
    if (e.target.matches('#prevStep')) {
      prevBrandStep();
      return;
    }
    
    if (e.target.matches('#skipStep')) {
      nextBrandStep();
      return;
    }
    
    if (e.target.matches('#completeBrandSetup')) {
      completeBrandSetupHandler();
      return;
    }
  });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  const navToggle = document.getElementById('navToggle');
  
  if (navMenu) navMenu.classList.toggle('active');
  if (navToggle) navToggle.classList.toggle('active');
}

// Modal Management
function showModal(modalName) {
  console.log(`Showing modal: ${modalName}`);
  hideAllModals();
  const modal = document.getElementById(`${modalName}Modal`);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('fade-in');
    
    // Reset brand setup step when opening brand setup modal
    if (modalName === 'brandSetup') {
      brandSetupStep = 1;
      updateBrandSetupUI();
    }
  } else {
    console.error(`Modal not found: ${modalName}Modal`);
  }
}

function hideModal(modalName) {
  const modal = document.getElementById(`${modalName}Modal`);
  if (modal) {
    modal.classList.add('hidden');
  }
}

function hideAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.add('hidden');
  });
}

// Authentication Handlers
function handleLogin(e) {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  console.log('Handling login for:', email);
  
  // Simulate login validation
  if (email && password) {
    const user = {
      id: 1,
      name: email.split('@')[0],
      email: email,
      plan: 'Starter'
    };
    
    // Check if user has brand kit (simulate)
    const hasBrandKit = false; // Simulate no existing brand kit
    
    currentUser = user;
    hideModal('login');
    
    if (hasBrandKit) {
      showDashboard();
    } else {
      showModal('brandSetup');
    }
  } else {
    alert('Please enter both email and password');
  }
}

function handleSignup(e) {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;
  
  console.log('Handling signup for:', email);
  
  if (!agreeTerms) {
    alert('Please agree to the Terms of Service and Privacy Policy');
    return;
  }
  
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  
  if (name && email && password) {
    const user = {
      id: Date.now(),
      name: name,
      email: email,
      plan: 'Starter'
    };
    
    currentUser = user;
    hideModal('signup');
    showModal('brandSetup');
  } else {
    alert('Please fill in all required fields');
  }
}

function handleLogout() {
  currentUser = null;
  currentBrandKit = null;
  showLandingPage();
}

// Plan Selection
function selectPlan(planName) {
  console.log('Selecting plan:', planName);
  
  if (planName === 'Enterprise') {
    alert('Our sales team will contact you within 24 hours!');
    return;
  }
  
  // If user is logged in, update their plan
  if (currentUser) {
    currentUser.plan = planName;
    alert(`Successfully upgraded to ${planName} plan!`);
  } else {
    // Show signup with selected plan
    showModal('signup');
    // Could store selected plan to apply after signup
  }
}

// Brand Setup Wizard
function setupBrandSetupWizard() {
  console.log('Setting up brand setup wizard...');
  
  // Logo upload handling
  setTimeout(() => {
    const logoUploadArea = document.getElementById('logoUploadArea');
    const logoUpload = document.getElementById('logoUpload');
    
    if (logoUploadArea && logoUpload) {
      logoUploadArea.addEventListener('click', () => logoUpload.click());
      logoUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        logoUploadArea.style.borderColor = 'var(--color-primary)';
      });
      logoUploadArea.addEventListener('dragleave', () => {
        logoUploadArea.style.borderColor = 'var(--color-border)';
      });
      logoUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
          handleLogoUpload(files[0]);
        }
      });
      
      logoUpload.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleLogoUpload(e.target.files[0]);
        }
      });
    }
    
    // Color input synchronization
    setupColorInputs();
  }, 100);
}

function handleLogoUpload(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const logoImg = document.getElementById('logoImg');
    const logoPreview = document.getElementById('logoPreview');
    const uploadPlaceholder = document.querySelector('.upload-placeholder');
    
    if (logoImg && logoPreview && uploadPlaceholder) {
      logoImg.src = e.target.result;
      logoPreview.style.display = 'block';
      uploadPlaceholder.style.display = 'none';
    }
  };
  reader.readAsDataURL(file);
}

function setupColorInputs() {
  const colorPairs = [
    ['primaryColor', 'primaryColorText'],
    ['secondaryColor', 'secondaryColorText'],
    ['accentColor', 'accentColorText']
  ];
  
  colorPairs.forEach(([colorInput, textInput]) => {
    const colorEl = document.getElementById(colorInput);
    const textEl = document.getElementById(textInput);
    
    if (colorEl && textEl) {
      colorEl.addEventListener('input', (e) => {
        textEl.value = e.target.value;
      });
      
      textEl.addEventListener('input', (e) => {
        if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
          colorEl.value = e.target.value;
        }
      });
    }
  });
}

function nextBrandStep() {
  if (brandSetupStep < 4) {
    brandSetupStep++;
    updateBrandSetupUI();
  }
}

function prevBrandStep() {
  if (brandSetupStep > 1) {
    brandSetupStep--;
    updateBrandSetupUI();
  }
}

function updateBrandSetupUI() {
  // Update progress indicators
  document.querySelectorAll('.progress-step').forEach((step, index) => {
    step.classList.toggle('active', index + 1 <= brandSetupStep);
  });
  
  // Show/hide steps
  document.querySelectorAll('.setup-step').forEach((step, index) => {
    step.classList.toggle('active', index + 1 === brandSetupStep);
  });
  
  // Update buttons
  const prevBtn = document.getElementById('prevStep');
  const nextBtn = document.getElementById('nextStep');
  const completeBtn = document.getElementById('completeBrandSetup');
  
  if (prevBtn) prevBtn.style.display = brandSetupStep > 1 ? 'block' : 'none';
  if (nextBtn) nextBtn.style.display = brandSetupStep < 4 ? 'block' : 'none';
  if (completeBtn) completeBtn.style.display = brandSetupStep === 4 ? 'block' : 'none';
}

function handleBrandSetup(e) {
  completeBrandSetupHandler();
}

function completeBrandSetupHandler() {
  console.log('Completing brand setup...');
  
  // Collect brand data
  const brandData = {
    name: document.getElementById('brandName')?.value || 'My Brand',
    description: document.getElementById('brandDescription')?.value || '',
    logo: document.getElementById('logoImg')?.src || null,
    colors: {
      primary: document.getElementById('primaryColor')?.value || '#1FB8CD',
      secondary: document.getElementById('secondaryColor')?.value || '#5D878F',
      accent: document.getElementById('accentColor')?.value || '#FFC185'
    },
    contact: {
      email: document.getElementById('contactEmail')?.value || '',
      phone: document.getElementById('contactPhone')?.value || '',
      website: document.getElementById('contactWebsite')?.value || ''
    }
  };
  
  currentBrandKit = brandData;
  saveUserData(currentUser, currentBrandKit);
  
  hideModal('brandSetup');
  showDashboard();
}

// View Management
function showLandingPage() {
  currentView = 'landing';
  const landingPage = document.getElementById('landingPage');
  const dashboard = document.getElementById('dashboard');
  const editor = document.getElementById('editor');
  
  if (landingPage) landingPage.classList.remove('hidden');
  if (dashboard) dashboard.classList.add('hidden');
  if (editor) editor.classList.add('hidden');
}

function showDashboard() {
  currentView = 'dashboard';
  const landingPage = document.getElementById('landingPage');
  const dashboard = document.getElementById('dashboard');
  const editor = document.getElementById('editor');
  
  if (landingPage) landingPage.classList.add('hidden');
  if (dashboard) dashboard.classList.remove('hidden');
  if (editor) editor.classList.add('hidden');
  
  // Update user info
  const userNameDisplay = document.getElementById('userNameDisplay');
  const planBadge = document.getElementById('planBadge');
  
  if (currentUser && userNameDisplay) {
    userNameDisplay.textContent = currentUser.name;
  }
  
  if (currentUser && planBadge) {
    planBadge.textContent = `${currentUser.plan} Plan`;
  }
  
  switchDashboardView('dashboard');
}

function showEditor(designType = null) {
  currentView = 'editor';
  const landingPage = document.getElementById('landingPage');
  const dashboard = document.getElementById('dashboard');
  const editor = document.getElementById('editor');
  
  if (landingPage) landingPage.classList.add('hidden');
  if (dashboard) dashboard.classList.add('hidden');
  if (editor) editor.classList.remove('hidden');
  
  initializeEditor(designType);
}

// Dashboard Views
function switchDashboardView(view) {
  const content = document.getElementById('dashboardContent');
  if (!content) return;
  
  switch (view) {
    case 'dashboard':
      content.innerHTML = getDashboardHomeHTML();
      setupDashboardHome();
      break;
    case 'create':
      showModal('template');
      populateTemplateModal();
      break;
    case 'designs':
      content.innerHTML = getMyDesignsHTML();
      break;
    case 'brand':
      content.innerHTML = getBrandKitHTML();
      break;
  }
}

function getDashboardHomeHTML() {
  return `
    <div class="quick-actions">
      <div class="action-card" onclick="showTemplateModal()">
        <span class="action-icon">➕</span>
        <h3 class="action-title">Create New Card</h3>
        <p class="action-description">Start designing your next social media post</p>
      </div>
      <div class="action-card" onclick="switchDashboardView('brand')">
        <span class="action-icon">🎨</span>
        <h3 class="action-title">Edit Brand Kit</h3>
        <p class="action-description">Update your brand colors, logo, and assets</p>
      </div>
      <div class="action-card" onclick="switchDashboardView('designs')">
        <span class="action-icon">📁</span>
        <h3 class="action-title">My Designs</h3>
        <p class="action-description">View and manage all your created designs</p>
      </div>
    </div>
    
    <div class="recent-designs">
      <h2>Recent Designs</h2>
      <div class="designs-grid">
        <div class="design-placeholder">
          <p>No designs yet. Create your first design to get started!</p>
          <button class="btn btn--primary" onclick="showTemplateModal()">Create Design</button>
        </div>
      </div>
    </div>
  `;
}

function getMyDesignsHTML() {
  return `
    <div class="designs-header">
      <h2>My Designs</h2>
      <button class="btn btn--primary" onclick="showTemplateModal()">Create New</button>
    </div>
    <div class="designs-grid">
      <div class="design-placeholder">
        <p>No designs found. Start creating to see them here!</p>
        <button class="btn btn--outline" onclick="showTemplateModal()">Create Your First Design</button>
      </div>
    </div>
  `;
}

function getBrandKitHTML() {
  const brandKit = currentBrandKit || {};
  return `
    <div class="brand-kit-header">
      <h2>Brand Kit</h2>
      <button class="btn btn--outline" onclick="editBrandKit()">Edit Brand Kit</button>
    </div>
    
    <div class="brand-kit-content">
      <div class="brand-section">
        <h3>Brand Information</h3>
        <div class="card">
          <div class="card__body">
            <p><strong>Brand Name:</strong> ${brandKit.name || 'Not set'}</p>
            <p><strong>Description:</strong> ${brandKit.description || 'Not set'}</p>
          </div>
        </div>
      </div>
      
      <div class="brand-section">
        <h3>Brand Colors</h3>
        <div class="color-palette">
          <div class="color-item" style="margin-bottom: 8px;">
            <div class="color-swatch" style="background: ${brandKit.colors?.primary || '#1FB8CD'}; width: 30px; height: 30px; border-radius: 4px; display: inline-block; margin-right: 8px;"></div>
            <span>Primary: ${brandKit.colors?.primary || '#1FB8CD'}</span>
          </div>
          <div class="color-item" style="margin-bottom: 8px;">
            <div class="color-swatch" style="background: ${brandKit.colors?.secondary || '#5D878F'}; width: 30px; height: 30px; border-radius: 4px; display: inline-block; margin-right: 8px;"></div>
            <span>Secondary: ${brandKit.colors?.secondary || '#5D878F'}</span>
          </div>
          <div class="color-item" style="margin-bottom: 8px;">
            <div class="color-swatch" style="background: ${brandKit.colors?.accent || '#FFC185'}; width: 30px; height: 30px; border-radius: 4px; display: inline-block; margin-right: 8px;"></div>
            <span>Accent: ${brandKit.colors?.accent || '#FFC185'}</span>
          </div>
        </div>
      </div>
      
      <div class="brand-section">
        <h3>Contact Information</h3>
        <div class="card">
          <div class="card__body">
            <p><strong>Email:</strong> ${brandKit.contact?.email || 'Not set'}</p>
            <p><strong>Phone:</strong> ${brandKit.contact?.phone || 'Not set'}</p>
            <p><strong>Website:</strong> ${brandKit.contact?.website || 'Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function setupDashboardHome() {
  // Add any specific dashboard home interactions here
}

function editBrandKit() {
  // Pre-populate brand setup modal with existing data
  if (currentBrandKit) {
    setTimeout(() => {
      const brandName = document.getElementById('brandName');
      const brandDescription = document.getElementById('brandDescription');
      
      if (brandName) brandName.value = currentBrandKit.name || '';
      if (brandDescription) brandDescription.value = currentBrandKit.description || '';
    }, 100);
  }
  showModal('brandSetup');
}

function showTemplateModal() {
  showModal('template');
  populateTemplateModal();
}

// Template Modal
function populateTemplateModal() {
  const platformSelect = document.getElementById('platformSelect');
  const templateGrid = document.getElementById('templateGrid');
  
  if (platformSelect) {
    platformSelect.innerHTML = '<option value="">Select Platform</option>' +
      appData.socialPlatforms.map(platform => 
        `<option value="${platform.name}">${platform.name} (${platform.dimensions})</option>`
      ).join('');
    
    platformSelect.addEventListener('change', (e) => {
      if (e.target.value) {
        populateTemplatesForPlatform(e.target.value);
      }
    });
  }
  
  if (templateGrid) {
    templateGrid.innerHTML = `
      <p class="text-center">Select a platform above to view available templates</p>
    `;
  }
}

function populateTemplatesForPlatform(platformName) {
  const templateGrid = document.getElementById('templateGrid');
  if (!templateGrid) return;
  
  // Generate sample templates for the platform
  const templates = Array.from({length: 8}, (_, i) => ({
    id: i + 1,
    name: `Template ${i + 1}`,
    platform: platformName,
    category: appData.templateCategories[i % appData.templateCategories.length].name
  }));
  
  templateGrid.innerHTML = templates.map(template => `
    <div class="template-item" onclick="selectTemplate('${template.id}', '${platformName}')">
      <h4>${template.name}</h4>
      <p>${template.category}</p>
    </div>
  `).join('');
}

function selectTemplate(templateId, platformName) {
  hideModal('template');
  currentDesign = {
    id: Date.now(),
    templateId,
    platform: platformName,
    name: `New ${platformName} Design`
  };
  showEditor(currentDesign);
}

// Editor Functions
function initializeEditor(design) {
  const designCanvas = document.getElementById('designCanvas');
  if (!designCanvas) return;
  
  console.log('Initializing editor with design:', design);
  
  // Set canvas size based on platform
  const platform = appData.socialPlatforms.find(p => p.name === design?.platform);
  if (platform) {
    const [width, height] = platform.dimensions.split('x').map(Number);
    designCanvas.width = width;
    designCanvas.height = height;
  }
  
  // Initialize canvas context
  const ctx = designCanvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, designCanvas.width, designCanvas.height);
  
  // Initialize layers
  canvasLayers = [
    { id: 1, name: 'Background', type: 'background', visible: true, locked: false }
  ];
  
  updateLayersPanel();
  populateEditorSidebar();
  
  // Update design title
  const designTitle = document.getElementById('designTitle');
  if (design && designTitle) {
    designTitle.textContent = design.name;
  }
}

function setupCanvasInteractions() {
  const canvas = document.getElementById('designCanvas');
  if (!canvas) return;
  
  canvas.addEventListener('click', (e) => {
    // Handle canvas clicks for selecting elements
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find clicked layer (simplified)
    console.log(`Canvas clicked at: ${x}, ${y}`);
  });
}

function switchEditorTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `${tabName}Tab`);
  });
}

function populateEditorSidebar() {
  // Populate template categories
  const categoriesContainer = document.getElementById('templateCategories');
  if (categoriesContainer) {
    categoriesContainer.innerHTML = appData.templateCategories.map(category => `
      <button class="category-btn" onclick="loadCategoryTemplates('${category.name}')">
        ${category.name} (${category.count})
      </button>
    `).join('');
  }
  
  // Populate brand elements
  const brandElements = document.getElementById('brandElements');
  if (brandElements && currentBrandKit) {
    brandElements.innerHTML = `
      <div class="brand-colors">
        <h5>Brand Colors</h5>
        <div class="color-palette">
          ${Object.entries(currentBrandKit.colors || {}).map(([name, color]) => `
            <button class="color-btn" style="background: ${color}; width: 30px; height: 30px; border: 1px solid #ccc; border-radius: 4px; margin: 4px; cursor: pointer;" onclick="applyColor('${color}')" title="${name}"></button>
          `).join('')}
        </div>
      </div>
      <div class="brand-logo">
        <h5>Logo</h5>
        ${currentBrandKit.logo ? `
          <button class="logo-btn" onclick="addLogo()" style="background: none; border: 1px solid #ccc; border-radius: 4px; padding: 8px; cursor: pointer;">
            <img src="${currentBrandKit.logo}" alt="Brand logo" style="max-width: 100px; max-height: 50px;">
          </button>
        ` : '<p>No logo uploaded</p>'}
      </div>
    `;
  }
}

function updateLayersPanel() {
  const layersList = document.getElementById('layersList');
  if (!layersList) return;
  
  layersList.innerHTML = canvasLayers.map(layer => `
    <div class="layer-item ${selectedLayer === layer.id ? 'active' : ''}" onclick="selectLayer(${layer.id})">
      <span class="layer-name">${layer.name}</span>
      <div class="layer-controls">
        <button class="layer-btn" onclick="toggleLayerVisibility(${layer.id})" title="Toggle visibility">
          ${layer.visible ? '👁️' : '🚫'}
        </button>
        <button class="layer-btn" onclick="toggleLayerLock(${layer.id})" title="Toggle lock">
          ${layer.locked ? '🔒' : '🔓'}
        </button>
        <button class="layer-btn" onclick="deleteLayer(${layer.id})" title="Delete layer">
          🗑️
        </button>
      </div>
    </div>
  `).join('');
}

function selectLayer(layerId) {
  selectedLayer = layerId;
  updateLayersPanel();
  updatePropertyControls();
}

function toggleLayerVisibility(layerId) {
  const layer = canvasLayers.find(l => l.id === layerId);
  if (layer) {
    layer.visible = !layer.visible;
    updateLayersPanel();
    redrawCanvas();
  }
}

function toggleLayerLock(layerId) {
  const layer = canvasLayers.find(l => l.id === layerId);
  if (layer) {
    layer.locked = !layer.locked;
    updateLayersPanel();
  }
}

function deleteLayer(layerId) {
  if (canvasLayers.length > 1) { // Keep at least one layer
    canvasLayers = canvasLayers.filter(l => l.id !== layerId);
    if (selectedLayer === layerId) {
      selectedLayer = canvasLayers[0]?.id;
    }
    updateLayersPanel();
    updatePropertyControls();
    redrawCanvas();
  }
}

function updatePropertyControls() {
  const controls = document.getElementById('propertyControls');
  if (!controls || !selectedLayer) return;
  
  const layer = canvasLayers.find(l => l.id === selectedLayer);
  if (!layer) return;
  
  controls.innerHTML = `
    <div class="property-group">
      <label class="form-label">Layer Name</label>
      <input type="text" class="form-control" value="${layer.name}" onchange="updateLayerName(${layer.id}, this.value)">
    </div>
    <div class="property-group">
      <label class="form-label">Opacity</label>
      <input type="range" class="form-control" min="0" max="100" value="100" onchange="updateLayerOpacity(${layer.id}, this.value)">
    </div>
  `;
}

function updateLayerName(layerId, newName) {
  const layer = canvasLayers.find(l => l.id === layerId);
  if (layer) {
    layer.name = newName;
    updateLayersPanel();
  }
}

function redrawCanvas() {
  const canvas = document.getElementById('designCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Redraw all visible layers
  canvasLayers.filter(layer => layer.visible).forEach(layer => {
    // Simplified drawing - in real app would draw actual layer content
    if (layer.type === 'background') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  });
}

// Editor Actions
function addTextElement() {
  const newLayer = {
    id: Date.now(),
    name: 'Text Layer',
    type: 'text',
    visible: true,
    locked: false,
    content: 'Sample Text',
    x: 100,
    y: 100
  };
  
  canvasLayers.push(newLayer);
  updateLayersPanel();
}

function addShapeElement() {
  const newLayer = {
    id: Date.now(),
    name: 'Shape Layer',
    type: 'shape',
    visible: true,
    locked: false,
    shape: 'rectangle',
    x: 150,
    y: 150
  };
  
  canvasLayers.push(newLayer);
  updateLayersPanel();
}

function saveDesign() {
  if (currentDesign) {
    // Simulate saving design
    alert('Design saved successfully!');
  }
}

function exportDesign() {
  const canvas = document.getElementById('designCanvas');
  if (canvas) {
    // Create download link
    const link = document.createElement('a');
    link.download = `${currentDesign?.name || 'design'}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }
}

// Utility functions for brand kit integration
function applyColor(color) {
  console.log(`Applying color: ${color}`);
  // In a real app, this would apply the color to the selected element
}

function addLogo() {
  console.log('Adding brand logo to design');
  // In a real app, this would add the logo as a new layer
}

function loadCategoryTemplates(categoryName) {
  console.log(`Loading templates for category: ${categoryName}`);
  // In a real app, this would load and display templates for the selected category
}

// Make functions globally available
window.selectPlan = selectPlan;
window.showTemplateModal = showTemplateModal;
window.selectTemplate = selectTemplate;
window.switchDashboardView = switchDashboardView;
window.editBrandKit = editBrandKit;
window.selectLayer = selectLayer;
window.toggleLayerVisibility = toggleLayerVisibility;
window.toggleLayerLock = toggleLayerLock;
window.deleteLayer = deleteLayer;
window.updateLayerName = updateLayerName;
window.applyColor = applyColor;
window.addLogo = addLogo;
window.loadCategoryTemplates = loadCategoryTemplates;