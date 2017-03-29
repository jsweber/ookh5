import style from './style.scss';
import Vue from "../../lib/js/vue.js";
import waterfall from "../../lib/js/vue-waterfall.min.js";
import getItems from "./getItems";

let doc = document, win = window;
// let index = parseInt(localStorage.getItem("flow_index")) || 1;
let index = 1;
let app = doc.getElementById("app");
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
        },
        link(id) {
            // localStorage.setItem("flow_index", index);
            // localStorage.setItem("flow_html", app.innerHTML);
            win.location.href = `http://wx.ooklady.com/wechat/item/product_info?productId=${id}`;
        }
    },
    created() {
        let self = this;
        // if (localStorage.getItem("flow_html")) {
        //     app.innerHTML = localStorage.getItem("flow_html")
        // }
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

win.addEventListener('scroll', function () {
    var scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop
    if (scrollTop + win.innerHeight > doc.body.clientHeight - 30) {
        vm.addItems();
    }
})



