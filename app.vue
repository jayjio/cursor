<template>
  <div class="project">
    <!-- Header -->
    <header class="header">
      <div class="logo-container">
        <img 
          :src="logoSvg" 
          alt="Jeremy Giovannetti Logo" 
          class="logo"
        />
      </div>
      <nav class="nav">
        <a href="#" class="nav-item">home</a>
        <a href="#" class="nav-item">home</a>
        <a href="#" class="nav-item">home</a>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- CTA Section -->
      <div class="cta-section">
        <div class="cta-container">
          <!-- Text Field with Floating Label -->
          <div
            class="text-field-open"
            :class="{ 'is-focused': isFocused || inputValue }"
            @click="focusInput"
          >
            <label
              for="welcome-input"
              class="floating-label"
              :class="{ 'floating': isFocused || inputValue }"
            >
              Ask me anything...
            </label>
            <input
              id="welcome-input"
              ref="inputRef"
              v-model="inputValue"
              type="text"
              class="text-input"
              @focus="isFocused = true"
              @blur="isFocused = false"
              @keyup.enter="handleSubmit"
            />
          </div>

          <!-- CTA Button -->
          <button
            class="cta-button"
            @click="handleSubmit"
            :disabled="isLoading"
          >
            <span class="cta-text">{{ isLoading ? 'Thinking...' : 'Show me what ya got' }}</span>
            <img v-if="!isLoading" :src="unionSvg" alt="" class="arrow-icon" />
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <!-- AI Response Display -->
        <div v-if="aiResponse" class="response-container">
          <div class="response-header">
            <span class="response-label">AI Response:</span>
          </div>
          <div class="response-content">
            {{ aiResponse }}
          </div>
        </div>

        <!-- Subtitle -->
        <p class="subtitle">"Ask questions and get AI-powered answers"</p>
      </div>
    </main>

    <!-- Fixed Footer Cards -->
    <footer class="footer-cards">
      <div 
        v-for="(card, index) in cards" 
        :key="index" 
        class="card"
      >
        <h3 class="card-title">{{ card.title }}</h3>
        <div class="tag-container">
          <span class="tag-text">{{ card.tag }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// State
const isFocused = ref(false)
const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const isLoading = ref(false)
const aiResponse = ref('')
const errorMessage = ref('')

// Assets
const logoSvg = 'http://localhost:3845/assets/5ecfc65b94c99655e8018db51dab82c756153dec.svg'
const unionSvg = 'http://localhost:3845/assets/4c2f52c3b15a0cff28bb335d3e8604a66fcf8aa6.svg'

// Default AI model
const selectedModel = 'gpt-4'

// Cards data
const cards = [
  { title: 'This is the card title with a nice style', tag: 'This is a header' },
  { title: 'This is the card title with a nice style', tag: 'This is a header' },
  { title: 'This is the card title with a nice style', tag: 'This is a header' },
  { title: 'This is the card title with a nice style', tag: 'This is a header' },
  { title: 'This is the card title with a nice style', tag: 'This is a header' },
  { title: 'This is the card title with a nice style', tag: 'This is a header' },
]

// Methods
const focusInput = () => {
  inputRef.value?.focus()
}

const handleSubmit = async () => {
  if (!inputValue.value.trim()) {
    errorMessage.value = 'Please enter a question'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  aiResponse.value = ''

  try {
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        message: inputValue.value,
        model: selectedModel
      }
    })

    if (response.success) {
      aiResponse.value = response.response
    } else {
      errorMessage.value = 'Failed to get response from AI'
    }
  } catch (error: any) {
    console.error('Error calling API:', error)
    errorMessage.value = error.data?.statusMessage || error.message || 'An error occurred. Please check your API key configuration.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rethink+Sans:wght@400;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.project {
  --bg-color: #1a1c23;
  --panel-bg-color: #22242b;
  --white-color: #fcf3ea;
  --text-field-stroke-color: #363944;
  --panel-corner-radius: 12px;
  --inner-corner-radius: 6px;
  --textfield-padding-lr: 21px;
  --textfield-padding-tb: 33px;
  --tag-container-padding-lr: 31px;
  --tag-container-pad-tb: 15px;
  --tag-corner-rad: 60px;
  
  background-color: var(--bg-color);
  min-height: 100vh;
  width: 100%;
  position: relative;
  font-family: 'Rethink Sans', sans-serif;
  padding-bottom: 250px; /* Space for fixed footer */
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 34px 52px;
  position: relative;
  z-index: 10;
}

.logo-container {
  width: 206.51px;
  height: 57px;
}

.logo {
  width: 100%;
  height: 100%;
  display: block;
}

.nav {
  display: flex;
  gap: 21px;
  align-items: center;
}

.nav-item {
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: normal;
  color: white;
  text-align: center;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.nav-item:hover {
  opacity: 0.8;
}

/* Main Content */
.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin-top: 100px;
}

.cta-section {
  width: 908px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 11px;
  align-items: center;
}

.cta-container {
  background-color: var(--panel-bg-color);
  border-radius: var(--panel-corner-radius);
  display: flex;
  gap: 10px;
  align-items: center;
  padding: var(--textfield-padding-tb) var(--textfield-padding-lr);
  width: 100%;
  height: 144px;
}

/* Text Field with Floating Label */
.text-field-open {
  flex: 1;
  height: 100%;
  border: 1px solid var(--text-field-stroke-color);
  border-radius: var(--inner-corner-radius);
  padding: var(--textfield-padding-tb) var(--textfield-padding-lr);
  position: relative;
  cursor: text;
  transition: border-color 0.3s ease;
}

.text-field-open.is-focused {
  border-color: #4a4d5a;
}

.floating-label {
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 600;
  font-size: 26px;
  line-height: normal;
  color: white;
  white-space: nowrap;
  position: absolute;
  left: var(--textfield-padding-lr);
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  transform-origin: left center;
}

.floating-label.floating {
  font-size: 14px;
  top: 12px;
  transform: translateY(0);
  font-weight: 500;
  color: #b0b4c4;
}

.text-input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 600;
  font-size: 26px;
  line-height: normal;
  color: white;
  padding-top: 24px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.text-field-open.is-focused .text-input {
  opacity: 1;
}

/* CTA Button */
.cta-button {
  background-color: var(--white-color);
  border: none;
  border-radius: var(--inner-corner-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: var(--textfield-padding-tb) var(--textfield-padding-lr);
  height: 100%;
  width: 282px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.cta-button:active {
  transform: translateY(0);
}

.cta-text {
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: normal;
  color: var(--panel-bg-color);
  white-space: nowrap;
}

.arrow-icon {
  width: 17.5px;
  height: 13.5px;
}

/* Error Message */
.error-message {
  width: 100%;
  background-color: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: var(--inner-corner-radius);
  padding: 16px 21px;
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #fca5a5;
  margin-top: 11px;
}

/* AI Response Display */
.response-container {
  width: 100%;
  background-color: var(--panel-bg-color);
  border: 1px solid var(--text-field-stroke-color);
  border-radius: var(--panel-corner-radius);
  padding: var(--textfield-padding-tb) var(--textfield-padding-lr);
  margin-top: 20px;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.response-header {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--text-field-stroke-color);
}

.response-label {
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: var(--white-color);
}

.response-content {
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.6;
  color: var(--white-color);
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Subtitle */
.subtitle {
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: normal;
  color: var(--white-color);
  width: 100%;
  margin-top: 15px;
}

/* Disabled button state */
.cta-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.cta-button:disabled:hover {
  transform: none;
  box-shadow: none;
}

/* Fixed Footer Cards */
.footer-cards {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 29px;
  align-items: center;
  padding: 20px;
  background: linear-gradient(to top, var(--bg-color) 80%, transparent);
  overflow-x: auto;
  z-index: 100;
}

.card {
  flex-shrink: 0;
  width: 273px;
  height: 201px;
  border: 1px solid var(--text-field-stroke-color);
  border-radius: var(--inner-corner-radius);
  padding: var(--textfield-padding-tb) var(--textfield-padding-lr);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: #4a4d5a;
}

.card-title {
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 400;
  font-size: 22px;
  line-height: 1.02;
  color: white;
  margin: 0;
}

.tag-container {
  background-color: var(--panel-bg-color);
  border-radius: var(--tag-corner-rad);
  padding: var(--tag-container-pad-tb) var(--tag-container-padding-lr);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 224px;
}

.tag-text {
  font-family: 'Rethink Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.02;
  color: #7a7f93;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .header {
    padding: 24px 32px;
  }
  
  .cta-section {
    width: 100%;
  }
  
  .cta-container {
    flex-direction: column;
    height: auto;
  }
  
  .text-field-open {
    width: 100%;
    min-height: 80px;
  }
  
  .cta-button {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  
  .nav {
    gap: 15px;
  }
  
  .nav-item {
    font-size: 18px;
  }
  
  .footer-cards {
    justify-content: flex-start;
    padding: 15px;
  }
}
</style>
