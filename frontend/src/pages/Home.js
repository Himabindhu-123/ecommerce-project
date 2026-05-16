import banner from "../assets/banner.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

const [products,setProducts]=useState([]);
const [search,setSearch]=useState("");
const [cart,setCart]=useState([]);
const [orders,setOrders]=useState([]);
const [page,setPage]=useState("home");
const [selectedCategory,setSelectedCategory]=useState("All");

const [selectedProduct,setSelectedProduct]=useState(null);

const [qty,setQty]=useState(1);

const [size,setSize]=useState("");

const [shuffledProducts, setShuffledProducts] = useState([]);


useEffect(()=>{

axios
.get("http://localhost:5000/products")

.then((res)=>setProducts(res.data))

.catch((err)=>console.log(err));

},[]);

useEffect(() => {

if(products.length > 0){

setShuffledProducts(
shuffleArray(products)
);

}

}, [products]);



const shuffleArray=(array)=>{

return [...array].sort(()=>Math.random()-0.5);

};



const getFilteredProducts = () => {

const source =

selectedCategory === "All"

?

shuffledProducts

:

products;


return source.filter((item)=>{

const matchesSearch =
item.name
.toLowerCase()
.includes(
search.toLowerCase()
);


const matchesCategory =

selectedCategory==="All"

||

item.category===selectedCategory;


return matchesSearch
&&
matchesCategory;

});

};


return(

<div className="bg-gradient-to-br from-blue-100 to-pink-100 min-h-screen flex flex-col">


{/* HEADER */}

<div className="py-8 text-center bg-gradient-to-r from-blue-200 via-pink-100 to-blue-200 shadow-md">

<h1 className="text-4xl font-extrabold text-blue-800">

🛍️ Lifestyle & Unique

</h1>



<div className="flex justify-center gap-10 mt-6">

<button
onClick={()=>setPage("home")}
className={`px-5 py-2 rounded-lg font-semibold transition
${
page==="home"
? "bg-purple-600 text-white shadow-lg"
: "bg-white text-black hover:bg-blue-100"
}`}
>
Home
</button>


<button
onClick={()=>setPage("cart")}
className={`px-5 py-2 rounded-lg font-semibold transition
${
page==="cart"
? "bg-purple-600 text-white shadow-lg"
: "bg-white text-black hover:bg-blue-100"
}`}
>
🛒 My Cart ({cart.length})
</button>


<button
onClick={()=>setPage("orders")}
className={`px-5 py-2 rounded-lg font-semibold transition
${
page==="orders"
? "bg-purple-600 text-white shadow-lg"
: "bg-white text-black hover:bg-blue-100"
}`}
>
📦 Orders ({orders.length})
</button>

</div>

</div>



{/* HOME */}

{page==="home" && (

<>

<div className="flex justify-center my-6">

<div className="flex bg-white rounded-xl overflow-hidden shadow-lg w-[450px]">

<input

placeholder="Search Products"

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="p-4 w-full outline-none"
/>


<button className="bg-yellow-400 px-6">

🔍

</button>


</div>

</div>

{/* HERO SECTION */}

<div className="
relative
w-full
h-[250px]
md:h-[350px]
overflow-hidden
">

<img
src={banner}
alt="Fashion Banner"
className="
w-full
h-full
object-cover
"
/>

<div className="absolute inset-0 bg-black/20"></div>


{/* Text Overlay */}

<div className="
absolute
top-1/2
left-10
transform
-translate-y-1/2
text-white
">

<h1 className="
text-3xl
md:text-5xl
font-extrabold
mb-4
drop-shadow-lg
">
Step into your new season.
</h1>


<p className="
text-lg
mb-6
">
Discover fashion, gadgets & more ✨
</p>


<button

onClick={()=>{
document
.getElementById("products")
.scrollIntoView({
behavior:"smooth"
});
}}

className="
bg-pink-500
hover:bg-pink-600
px-6
py-3
rounded-full
font-bold
shadow-lg
transition
"
>

Explore → 🛍️

</button>

</div>

</div>

<div className="
flex
flex-wrap
justify-center
gap-8
mt-12
mb-10
">

{["All","Fashion","Electronics","Accessories"]

.map((cat)=>(

<div

key={cat}

onClick={()=>setSelectedCategory(cat)}

className={`cursor-pointer px-4 py-2 rounded-lg transition
${
selectedCategory===cat
? "bg-pink-500 text-white"
: "bg-white hover:bg-pink-100"
}`}

>

{cat}

</div>

))}

</div>


<div
id="products"
className="p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
>

{

getFilteredProducts()

.map((product)=>(

<div

key={product._id}

className="bg-white rounded-3xl shadow-xl p-5 hover:shadow-2xl transition"

>


<img

src={product.image}

onClick={()=>{

setSelectedProduct(product);

setQty(1);

setSize("");

}}

className="w-full h-64 object-contain p-4 cursor-pointer"

/>


<h2 className="text-2xl font-bold">

{product.name}

</h2>


<p className="text-green-600 font-bold">

₹{product.price}

</p>


</div>

))

}


</div>

</>

)}



{/* CART */}

{page==="cart" && (

<div className="p-10">

<h2 className="text-3xl text-center mb-8">

🛒 My Cart

</h2>


{

cart.length===0 ?

<p className="text-center">

Cart Empty

</p>

:

cart.map((item,index)=>(

<div
key={index}

className="
bg-white
p-6
rounded-2xl
shadow
mb-6
max-w-xl
mx-auto
"
>

<div className="flex gap-5 items-center">

<img
src={item.image}
className="w-32 h-32 object-contain"
/>


<div>

<h3 className="font-bold text-xl">

{item.name}

</h3>


<p>

Qty: {item.qty}

</p>


<p>

Size: {item.size || "None"}

</p>


<p className="text-green-600 font-bold">

₹{item.price * item.qty}

</p>



<button

onClick={()=>{

setCart(

cart.filter((_,i)=>i!==index)

);

alert("❌ Removed From Cart");

}}

className="
bg-red-500
text-white
px-4
py-2
rounded-lg
mt-3
"

>

Remove

</button>

</div>

</div>

</div>

))

}

</div>

)}

{/* ORDERS */}

{page==="orders" && (

<div className="p-10">

<h2 className="text-3xl text-center mb-8">

📦 Orders

</h2>


{

orders.length===0 ?

<p className="text-center">

No Orders Yet

</p>

:

orders.map((item,index)=>(

<div

key={index}

className="
bg-white
p-6
rounded-2xl
shadow
mb-6
max-w-xl
mx-auto
"

>

<div className="flex gap-5 items-center">

<img
src={item.image}
className="w-32 h-32 object-contain"
/>


<div>

<h3 className="font-bold text-xl">

{item.name}

</h3>


<p>

Qty:

{item.qty}

</p>


<p>

Size:

{item.size || "None"}

</p>


<p className="text-green-600 font-bold">

₹{item.price * item.qty}

</p>



<button

onClick={()=>{

setOrders(

orders.filter((_,i)=>i!==index)

);

alert("🚫 Order Cancelled");

}}

className="
bg-red-500
text-white
px-4
py-2
rounded-lg
mt-3
"

>

Cancel Order

</button>

</div>

</div>

</div>

))

}

</div>

)}

{/* PRODUCT MODAL */}

{

selectedProduct && (

<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

<div className="bg-white p-6 rounded-xl w-96">


<img

src={selectedProduct.image}

className="h-72 w-full object-contain p-4"

/>


<h2>

{selectedProduct.name}

</h2>


<p>

₹{selectedProduct.price}

</p>



<div className="flex gap-4 mt-3">

<button

onClick={()=>setQty(

qty>1 ?

qty-1

:

1

)}

>

-

</button>


<span>

{qty}

</span>


<button

onClick={()=>setQty(

qty+1

)}

>

+

</button>

</div>



{

selectedProduct.category==="Fashion"

&& (

<div className="flex gap-2 mt-3">

{

["S","M","L","XL","Free"]

.map((s)=>(

<button

key={s}

onClick={()=>setSize(s)}

className={`border px-3 py-1

${size===s

?

"bg-blue-300"

:

""

}

`}

>

{s}

</button>

))

}

</div>

)

}



<div className="flex gap-3 mt-5">


<button

onClick={()=>{

setCart([

...cart,

{

...selectedProduct,

qty,

size

}

]);

alert("🎉 Added To Cart 🛒");

setSelectedProduct(null);

}}

className="bg-orange-500 text-white px-4 py-2"

>

Add To Cart

</button>



<button

onClick={()=>{

setOrders([

...orders,

{

...selectedProduct,

qty,

size

}

]);

alert("🎊 Order Placed Successfully");

setSelectedProduct(null);

}}

className="bg-green-600 text-white px-4 py-2"

>

Buy

</button>

</div>



<button

onClick={()=>setSelectedProduct(null)}

className="mt-4 text-red-500"

>

Close

</button>

</div>

</div>

)

}



<footer className="
mt-auto
bg-gray-900
text-white
text-center
py-6
">

<h2>

🛍️ Lifestyle & Unique Store

</h2>


<p className="text-gray-400">

Fashion • Electronics • Accessories

</p>


<p className="text-sm mt-2">

© 2026 All Rights Reserved 

</p>

</footer>

</div>

);

}

export default Home;