<template>
    <div class="wrapper">
        <div class="columns">
            <column v-for="(item, index) in items" :key="item.id" :data="item" :index="index" ref="column"></column>
        </div>
    </div>
</template>

<script>
import Column from './Column';

import { TweenMax } from 'gsap';

export default {
    name: 'Columns',
    data() {
        return {
            items: [
                {
                    title: 'Емкостное оборудование',
                    text: 'Емкость 16 м³',
                    description: 'Предприятие производит емкости и резервуары, предназначенные для хранения газообразных и жидких веществ.',
                    facts: [
                        {
                            title: 'Изделия от 5 до 100 м³',
                            text: 'Готовы к серийному производству'
                        },
                        {
                            title: 'До 9 баллов сейсмостойкость',
                            text: 'Включительно'
                        }
                    ],
                    model_url: '/static/models/model-1.glb'
                },
                {
                    title: 'Емкостное оборудование',
                    text: 'Резервуар для хранения пенораствора',
                    description: 'Предприятие производит емкости и резервуары, предназначенные для хранения газообразных и жидких веществ.',
                    facts: [
                        {
                            title: 'Изделия от 5 до 100 м³',
                            text: 'Готовы к серийному производству'
                        },
                        {
                            title: 'До 9 баллов сейсмостойкость',
                            text: 'Включительно'
                        }
                    ],
                    model_url: '/static/models/model-2.glb'
                },
                {
                    title: 'Разрезные тройники',
                    text: 'Диаметр от 50 до 1420 мм',
                    description: 'Диаметр от 50 до 1420 мм. Российская разработка, импортозамещающая продукция.',
                    facts: [
                        {
                            title: 'Разрезные тройники',
                            text: 'совместимы с оборудованием ПАО «Газпром»'
                        },
                        {
                            title: 'Отсутствие сложного',
                            text: 'элемента конструкции — седловидного шва'
                        }
                    ],
                    model_url: '/static/models/model-3.glb'
                }
            ],
            duration: 0.25
        }
    },
    components: {
        Column
    },
    watch: {
        '$store.state.zoom.status': function(status) {
            status ? this.zoomIn() : this.zoomOut();
        }
    },
    methods: {
        zoomIn() {
            let index = this.$store.getters.getZoomIndex;

            this.$refs.column.map((item, i) => {
                if (i !== index) {
                    TweenMax.set(item.$el, {
                        pointerEvents: 'none'
                    });

                    TweenMax.to(item.$el.children[0], this.duration, {
                        alpha: 0,
                        ease: 'sine.out',
                    });

                    
                } else {
                    TweenMax.to(item.$el.children[3], this.duration, {
                        scale: 1,
                        ease: 'sine.out',
                        delay: this.duration
                    });

                    TweenMax.to(item.$el.children[1], this.duration, {
                        alpha: 1,
                        ease: 'sine.out',
                        delay: this.duration / 2
                    });

                    TweenMax.to(item.$el.children[2], this.duration, {
                        alpha: 1,
                        onComplete: () => {
                            TweenMax.set(item.$el.children[2], {
                                pointerEvents: 'all'
                            })
                        }
                    });

                    TweenMax.to(item.$el.children[0].children[1], this.duration, {
                        alpha: 0,
                        ease: 'sine.out',
                    });
                }
            })
        },
        zoomOut() {
            this.$refs.column.map((item, i) => {
                TweenMax.set(item.$el.children[2], {
                    pointerEvents: 'none',
                    onComplete: () => {
                        TweenMax.to(item.$el.children[2], this.duration, {
                            alpha: 0,
                        });
                    }
                })

                TweenMax.to(item.$el.children[3], this.duration, {
                    scale: 0,
                    ease: 'sine.out'
                });

                TweenMax.to(item.$el.children[1], this.duration, {
                    alpha: 0,
                    ease: 'sine.out',
                    delay: this.duration / 2
                });

                TweenMax.to(item.$el.children[0], this.duration, {
                    alpha: 1,
                    ease: 'sine.out',
                    delay: this.duration,
                    onComplete: () => {
                        TweenMax.set(item.$el, {
                            pointerEvents: 'all'
                        })
                    }
                });

                TweenMax.to(item.$el.children[0].children[1], this.duration, {
                    alpha: 1,
                    ease: 'sine.out',
                    delay: this.duration
                });
            })
        }
    },
    mounted() {
       
    }
}
</script>

<style lang="scss">

.columns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1600px;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    position: relative;
}

</style>