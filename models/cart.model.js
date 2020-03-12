
module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.addOne = function (product, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: product, qty: 0, price: 0};
            this.totalQty++;
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalPrice += storedItem.item.price;
    };

    this.getListItem = function () {
        let arr = [];
        for (let id in this.items) {
            if (this.items.hasOwnProperty(id)) {
                const element = this.items[id];
                arr.push(element);
            }
        }
        return arr;
    }
};