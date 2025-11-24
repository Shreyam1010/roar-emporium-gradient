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
    <Card className={`group overflow-hidden bg-card hover-lift rounded-2xl border border-border/50 shadow-md hover:shadow-2xl transition-all duration-500 ${!inStock ? 'opacity-60' : ''}`}>
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img
          src={getProductImage(image)}
          alt={name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${!inStock ? 'grayscale' : ''}`}
        />
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <Badge variant="destructive" className="text-lg px-6 py-2 rounded-xl">
              Out of Stock
            </Badge>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-accent transition-colors duration-300">{name}</h3>
        <Button asChild variant="outline" className="w-full rounded-xl border-2 border-accent/30 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 hover:scale-105">
          <Link to={`/products/${id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
