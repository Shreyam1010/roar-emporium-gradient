import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { getProductImage } from "@/lib/productImages";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  inStock?: boolean;
}

const ProductCard = ({ id, name, image, inStock = true }: ProductCardProps) => {
  return (
    <Card className={`group overflow-hidden bg-card hover:shadow-xl transition-all duration-300 rounded-xl border-border ${!inStock ? 'opacity-60' : ''}`}>
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img
          src={getProductImage(image)}
          alt={name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${!inStock ? 'grayscale' : ''}`}
        />
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Badge variant="destructive" className="text-lg px-6 py-2">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-foreground">{name}</h3>
        <Button asChild variant="outline" className="w-full rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300">
          <Link to={`/products/${id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
