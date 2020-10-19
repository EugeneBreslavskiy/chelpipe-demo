<template>
    <div class="column">
        <div class="column__content">
            <div class="column__scene-container">
                <scene :model_url="data.model_url" :index="index" ref="scene"></scene>
            </div>
            <div class="column__elements">
                <span class="column__index">
                    {{ `0` + (index + 1) }}
                </span>
                <h2 class="column__title">
                    {{ data.title }}
                </h2>
                <p class="column__text">
                    {{ data.text }}
                </p>
            </div>
        </div>
        <div class="column__zoom">
            <span class="column__index">
                {{ `0` + (index + 1) }}
            </span>
            <h2 class="column__title column__title_large">
                {{ data.title }}
            </h2>
            <p class="column__text">
                {{ data.description }}
            </p>
            <ul class="column__facts">
                <li class="column__fact" v-for="fact in data.facts" :key="fact.id">
                    <h3 class="column__fact-title">
                        {{ fact.title }}
                    </h3>
                    <span class="column__fact-text">
                        {{ fact.text }}
                    </span>
                </li>
            </ul>
        </div>
        <div class="column__close" @click="zoomOut()">
            <img src="../assets/images/cross.svg" class="column__close-img">
        </div>
        <div class="column__circle"></div>
    </div>
</template>

<script>
import Scene from './Scene'

export default {
    name: 'Column',
    props: [
        'data',
        'index'
    ],
    components: {
        Scene
    },
    methods: {
        zoomOut() {
            this.$store.commit('changeZoom', {
                status: false,
                index: this.index
            });
        }
    },
    mounted() {
       
    }
}
</script>

<style lang="scss">

.column {
    width: 400px;
    margin: 0 25px;
}

.column__scene-container {
    width: 400px;
    height: 400px;
}

.column__index {
    display: block;
    margin: 0 0 10px 0;
    font-size: 24px;
    color: #EC443D;
}

.column__title {
    margin: 0 0 20px 0;
    font-size: 48px;
    font-weight: 900;

    &.column__title_large {
        font-size: 65px;
    }
}

.column__text {
    margin: 0;
    font-size: 20px;
}

.column__zoom {
    width: 600px;
    position: absolute;
    top: 200px;
    right: 0px;
    opacity: 0;
    z-index: -1;
}

.column__facts {
    display: flex;
    justify-content: space-between;
    margin: 70px 0;
    padding: 0;
    list-style: none;
}

.column__fact {
    width: 250px;
}

.column__fact-title {
    margin: 0 0 10px 0;
    font-size: 32px;
    font-weight: bold;
    line-height: 1.5;
}

.column__fact-text {
    font-size: 14px;
    opacity: 0.4;
}

.column__close {
    width: 100px;
    height: 100px;
    opacity: 0;
    position: absolute;
    top: 50px;
    right: 0;
    pointer-events: none;
}

.column__close-img {
    display: block;
    width: 100%;
}

.column__circle {
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: linear-gradient(216.23deg, #2B3131 14.12%, #2D2F2F 50.19%, #222324 85.77%);
    position: absolute;
    left: calc(50% - 300px);
    top: -100px;
    z-index: -5;
    transform: scale(0);
}

</style>