import React, { useEffect, useState } from 'react'

const ProductDetails = () => {

  const { id } = useParams();
  const [ product, setProdut] = useState(null);

  useEffect(() => {

  }, [id]);
  return (
    <div>
      <h2>Product Details</h2>
      {product && (
        <div>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
}

export default ProductDetails