class Cart {
    cart = []
    diskon = []
    constructor(username){
        this.username = username
    }


    updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        this.cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `<p>${item.name} - $${item.price} x ${item.quantity}</p>`;
            // remove a click event listener
            var buttonRemove = document.createElement("button");
            buttonRemove.textContent = `-`;
            buttonRemove.addEventListener('click', function () {
                keranjang.removeFromCart(`${item.id}`);
            });
            cartItemDiv.appendChild(buttonRemove);
            cartItemsContainer.appendChild(cartItemDiv);
        });
        const sum = document.createElement('div');;
        sum.innerHTML = `<p>Total Price: ${this.totalPrice}</p> <button>Checkout</button>`;
        cartItemsContainer.appendChild(sum);
        
    }

    removeFromCart(productId) {
        const index = this.cart.findIndex(item => item.id === productId);

        if (index !== -1) {
            this.cart.splice(index, 1);
            this.updateCart();
        }
    }

    addToCart(productId) {
        const product = produk.katalog.find(p => p.id === productId);
        const index = this.cart.findIndex(p => p.id === productId);
        if (index != -1) {
            this.cart[index].quantity += 1;   
        }else{
            this.cart.push({ ...product, quantity: 1 });
        }
        this.updateCart();
    }

    get totalPrice(){
        const data = this.cart;
        // Menggunakan reduce untuk menghitung total harga
        const totalPrice = data.reduce((total, item) => {
            const price = parseFloat(item.price);
            const quantity = parseInt(item.quantity);
            // Menambahkan subtotal item ke total harga
            return total + price * quantity;
        }, 0);

        const totalDiskon = this.totalDiskon(totalPrice)

        const totalHargaSetelahDiskon = (totalPrice - totalDiskon).toFixed(2);

        return totalHargaSetelahDiskon;
    }

    addCoupon(potongan){
        console.log('masuk')
        try {
            let persentase = this.diskon.reduce((total, diskon) => {
                return total + diskon;
            })

            if ((persentase + potongan) > 100) {
                alert('Kupon tidak boleh melebihi batas maksimal')
            }else{
                this.diskon.push(potongan)
                this.updateCart();
                console.log('add kupon');
                alert('selmat kupon berhasil ditambahkan')
            }
        } catch (error) {

            this.diskon.push(potongan)
            this.updateCart();
            console.warn('Masuk kondisi error handle')
            alert('selmat kupon berhasil ditambahkan')
        }
        
    }

    totalDiskon(price){
        if (this.diskon.length != 0 ) {
            const persentase = this.diskon.reduce((total, diskon) => {
                return total + diskon;
            })
    
            return price * (persentase/100)
        }else{
            return 0;
        }
    }
}