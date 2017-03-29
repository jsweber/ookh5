import style from './style.scss';
import Vue from "../../lib/js/vue.js";
import waterfall from "../../lib/js/vue-waterfall.min.js";
import getItems from "./getItems";

let index = 1;
var vm = new Vue({
    el: "#app",
    data() {
        return {
            items: [],
            isBusy: false
        }
    },
    computed: {
        leftItems() {
            if (!this.leftData) {
                this.leftData = [];
            }
            let r = [];
            for (let i = 0; i < this.items.length; i++) {
                if (0 === i % 2) {
                    r.push(this.items[i]);
                }
            }
            this.leftData = this.leftData.concat(r);
            return this.leftData;
        },
        rightItems() {
            if (!this.rightData) {
                this.rightData = [];
            }
            let r = [];
            for (let i = 0; i < this.items.length; i++) {
                if (1 === i % 2) {
                    r.push(this.items[i]);
                }
            }
            this.rightData = this.rightData.concat(r);
            return this.rightData;
        }
    },
    methods: {
        addItems() {
            if (this.isBusy) {
                return;
            }
            let self = this;
            index++;
            getItems(index, (err, arr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                self.isBusy = true;
                if (0 === arr.length) {
                    self.$els.prompt.style.display = "block";
                }
                self.items = arr;
                self.$nextTick(() => {
                    self.isBusy = false;
                });
            })
        }
    },
    created() {
        let self = this;
        getItems(index, (err, arr) => {
            if (err) {
                console.error(err);
                return;
            }
            self.isBusy = true;
            self.items = arr;
            self.$nextTick(() => {
                self.isBusy = false;
            });
        })
    }
});

let doc = document, win = window;
win.addEventListener('scroll', function () {
    var scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop
    if (scrollTop + win.innerHeight > doc.body.clientHeight - 30) {
        vm.addItems();
    }
})



