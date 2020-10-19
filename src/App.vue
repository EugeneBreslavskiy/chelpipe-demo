<template>
    <div id="app">
        <Columns/>
    </div>
</template>

<script>
import Columns from './components/Columns'

export default {
    name: 'App',
    data() {
        return {
            duration: 0.25
        }
    },
    components: {
        Columns
    }
}
</script>

<style lang="scss">

@font-face {
    font-family: 'Circe';
    src: url('./assets/fonts/Circe-Light.eot');
    src: local('Circe Light'), local('Circe-Light'),
    url('./assets/fonts/Circe-Light.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Circe-Light.woff') format('woff'),
    url('./assets/fonts/Circe-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
}

@font-face {
    font-family: 'Circe';
    src: url('./assets/fonts/Circe-Bold.eot');
    src: local('Circe Bold'), local('Circe-Bold'),
    url('./assets/fonts/Circe-Bold.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Circe-Bold.woff') format('woff'),
    url('./assets/fonts/Circe-Bold.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
}

body {
    margin: 0;
    min-height: 100vh;
    font: 16px 'Circe', sans-serif;
    line-height: 1.25;
    color: #fff;
    background-color: #141415;
    background-image: url('./assets/images/grid-bg.svg');
    background-size: cover;
    overflow: hidden;
}
    
</style>
