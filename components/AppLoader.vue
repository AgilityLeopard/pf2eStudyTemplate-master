<template>
    <transition name="fade">
        <div v-if="visible" class="loader-overlay">
            <div class="loader-box">
                <div class="loader-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="loader-text">Загрузка</div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: { visible: { type: Boolean, default: false } }
};
</script>

<style scoped>
.loader-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    /* тёмный полупрозрачный фон */
    backdrop-filter: blur(5px);
    /* эффект матовости / размытия */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200000 !important;
}

.loader-box {
    background: rgba(30, 30, 30, 0.7);
    backdrop-filter: blur(10px);
    padding: 30px 50px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loader-dots {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}

.loader-dots span {
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 50%;
    animation: bounce 1.2s infinite ease-in-out;
}

.loader-dots span:nth-child(1) {
    animation-delay: 0s;
}

.loader-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.loader-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes bounce {

    0%,
    80%,
    100% {
        transform: scale(0);
    }

    40% {
        transform: scale(1);
    }
}

.loader-text {
    font-size: 1.6rem;
    color: #fff;
    letter-spacing: 0.05em;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
