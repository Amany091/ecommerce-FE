import Card from '../../ui/Card';
import { Link } from 'react-router-dom';

export default function SingleProduct({product}) {
  return (
    <Link
      to={`/products/${product._id}`}
    >
      <Card
        imageSrc={product.imgCover}
        imageAlt={product.title}
        cardTitle={product.title}
        priceAfterDiscount={product.priceAfterDiscount}
        price={product.price}
        rate={product.ratingsAverage}
      />
    </Link>
  );
}
