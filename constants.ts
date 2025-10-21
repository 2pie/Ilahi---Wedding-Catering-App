import type { MenuItem } from './types';

export const EVENT_TYPES = [
  { name: 'Wedding', image: 'https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?q=80&w=800&auto=format&fit=crop' },
  { name: 'Mehendi', image: 'https://images.unsplash.com/photo-1616165415772-1b15259990de?q=80&w=800&auto=format&fit=crop' },
  { name: 'Reception', image: 'https://images.unsplash.com/photo-1550952249-1671ba1b78cb?q=80&w=800&auto=format&fit=crop' },
  { name: 'Engagement', image: 'https://images.unsplash.com/photo-1532328192348-1a5253df6137?q=80&w=800&auto=format&fit=crop' },
  { name: 'Haldi', image: 'https://images.unsplash.com/photo-1616762297924-8c888985e54c?q=80&w=800&auto=format&fit=crop' },
  { name: 'Other', image: 'https://images.unsplash.com/photo-1505931499360-12d7d3a7b8e5?q=80&w=800&auto=format&fit=crop' },
];

export const MENU_ITEMS: MenuItem[] = [
  // Veg
  { id: 3, name: 'Paneer Tikka', price: 12, image: 'https://orders.popskitchen.in/storage/2024/09/image-358.png', description: 'Cubes of soft paneer marinated in yogurt and spices, grilled to perfection in a tandoor.', category: 'Veg', course: 'Starter', customization: { type: 'spice', label: 'Spiciness Level' } },
  { id: 9, name: 'Dal Makhani', price: 10, image: 'https://www.sharmispassions.com/wp-content/uploads/2012/05/dal-makhani7.jpg', description: 'A creamy and buttery lentil dish made with black lentils, kidney beans, and aromatic spices.', category: 'Veg', course: 'Main Course' },
  { id: 10, name: 'Malai Kofta', price: 14, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsT8TUD-NzEQeESGXCTvbEFMbcMp-heDW-Kw&s', description: 'Fried potato and paneer balls dunked in a rich, lightly sweet and spicy gravy.', category: 'Veg', course: 'Main Course', customization: { type: 'sweetness', label: 'Gravy Sweetness' } },
  { id: 1, name: 'Aloo Tikki Chaat', price: 8, image: 'https://sinfullyspicy.com/wp-content/uploads/2023/03/1-1.jpg', description: 'Spiced potato patties served with yogurt, tamarind chutney, and various toppings. A street food favorite.', category: 'Veg', course: 'Snack' },

  // Non-Veg
  { id: 2, name: 'Butter Chicken', price: 15, image: 'https://foodess.com/wp-content/uploads/2022/10/Foodess-Best-Butter-Chicken-1-2.jpg', description: 'Tender chicken pieces cooked in a rich, creamy tomato-based sauce with a blend of aromatic spices.', category: 'Non-Veg', course: 'Main Course', customization: { type: 'spice', label: 'Spiciness Level' } },
  { id: 6, name: 'Mutton Biryani', price: 18, image: 'https://sinfullyspicy.com/wp-content/uploads/2023/12/1200-by-1200-images-2.jpg', description: 'Aromatic basmati rice cooked with tender mutton pieces and a medley of exotic spices.', category: 'Non-Veg', course: 'Main Course', customization: { type: 'spice', label: 'Spiciness Level' } },
  { id: 11, name: 'Tandoori Fish Tikka', price: 16, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0-716YYVz7e2Bvgf8LwdihesIgbJ5YwKD2Q&s', description: 'Boneless fish chunks marinated in yogurt and tandoori spices, then grilled to smoky perfection.', category: 'Non-Veg', course: 'Starter', customization: { type: 'spice', label: 'Spiciness Level' } },
  { id: 12, name: 'Chicken Korma', price: 15, image: 'https://images.slurrp.com/prod/recipe_images/kitchen-nine/chicken-and-egg-korma-1623680033_NBGDKEXYVWIKIH4DUQMA.webp?impolicy=slurrp-20210601&width=1200&height=675', description: 'A mild and creamy chicken curry made with yogurt, nuts, and delicate spices.', category: 'Non-Veg', course: 'Main Course' },

  // Beverages
  { id: 8, name: 'Masala Chai', price: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbXKuyWAIBkEDeyB61xQj-RIoidct_Au6rkA&s', description: 'A traditional spiced Indian tea, brewed strong with milk and aromatic spices.', category: 'Beverages' },
  { id: 13, name: 'Sweet Lassi', price: 5, image: 'https://www.indianveggiedelight.com/wp-content/uploads/2023/01/sweet-lassi-recipe-featured.jpg', description: 'A refreshing yogurt-based drink, blended with sugar and served chilled.', category: 'Beverages' },
  { id: 4, name: 'Masala Shikanji', price: 4, image: 'https://images.archanaskitchen.com/images/recipes/drink-recipes/indian-drink-recipes/Masala_Soda_Shikanji_Recipe_1_7882542661.jpg', description: 'A zesty and refreshing Indian lemonade spiced with cumin, black salt, and other spices.', category: 'Beverages' },
  
  // Desserts
  { id: 7, name: 'Gulab Jamun', price: 6, image: 'https://www.cadburydessertscorner.com/hubfs/dc-website-2022/articles/soft-gulab-jamun-recipe-for-raksha-bandhan-from-dough-to-syrup-all-you-need-to-know/soft-gulab-jamun-recipe-for-raksha-bandhan-from-dough-to-syrup-all-you-need-to-know.webp', description: 'Soft, spongy milk-solid balls soaked in a sweet, fragrant syrup.', category: 'Desserts', customization: { type: 'sweetness', label: 'Sweetness Level' } },
  { id: 5, name: 'Ras Malai', price: 9, image: 'https://images.archanaskitchen.com/images/recipes/indian/sweet-recipes/traditional_rasmalai_recipe_d5b18e48ac.jpg', description: 'Soft paneer discs soaked in chilled, creamy, saffron-infused milk.', category: 'Desserts', customization: { type: 'sweetness', label: 'Sweetness Level' } },
  { id: 14, name: 'Gajar ka Halwa', price: 7, image: 'https://www.nestleprofessional.in/sites/default/files/2022-09/Gajar-Halwa_0.jpg', description: 'A warm, sweet pudding made from grated carrots, milk, sugar, and ghee, garnished with nuts.', category: 'Desserts' },
];