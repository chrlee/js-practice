import { useEffect, useState } from "react";
import { DUMMY_CARTS_URL, DUMMY_PRODUCTS_URL } from "../../utils/constants";

function Cart({ cart }: { cart: any }) {
    return (
        <>
            <h3>Cart</h3>
            {cart.products.map((product: any) => {
                return <Product product={product} />
            })}
        </>
    );
}

function Product({ product }: { product: any }) {
    return (
        <>
            <h4>{product.title}</h4>
        </>
    )
}

export default function() {
    const [cartsData, setCartsData] = useState<any>([]);

    useEffect(() => {
        async function fetchData(){
            try {
                const carts = await (await fetch(DUMMY_CARTS_URL)).json();
                console.log(carts)
                const fullCartsData = await Promise.all(
                    carts.carts.map(async (val: any) => {
                        const productPromises = val.products.map(async (product: any) => {
                            return (await fetch(`${DUMMY_PRODUCTS_URL}/${product.id}`)).json();
                        })

                        const productsData = await Promise.allSettled(productPromises);
                        const products = productsData.reduce((acc, curr) => {
                            if(curr.status === 'fulfilled') acc.push(curr.value);
                            return acc;
                        }, [] as Array<any>);

                        return {
                            ...val,
                            products,
                        }
                    })
                );

                setCartsData(fullCartsData);
            } catch (e) {
                console.error(e);
            }
        }

        fetchData();
    }, []);

    return <div>
        {cartsData.map((val: any) => {
            return <Cart cart={val} />
        })}
    </div>
}