export const static_categories = [
  "Cell Phones & Accessories", //0
  "Clothing, Shoes & Jewelry", //2
  "Sports & Outdoors", //3
  "Kindle Store", //4
  "Home & Kitchen", //5
  "Automotive Parts & Accessories", //7
  "Electronics", //8
  "Industrial & Scientific", //9
  "Toys & Games", //10
  "Office Products", //12
  "Health, Household & Baby Care", //16
  "Pet Supplies", //17
  "Baby", //18
  "Garden & Outdoor", //20
  "Health & Household",
  "Tools & Home Improvement",
  "Amazon Devices",
  "Movies & TV",
  "Computers",
  "Baby Products",
  "Video Games",
  "Gift Cards",
];

export const languages = [
  { value: "fr", name: "French", id: "1" },
  { value: "de", name: "German", id: "2" },
  { value: "es", name: "Spainish", id: "3" },
  { value: "it", name: "Italian", id: "4" },
  { value: "pt", name: "Portuguese", id: "5" },
  { value: "ru", name: "Russian", id: "6" },
  { value: "ar", name: "Arabic", id: "7" },
];

interface categoryRawType {
  title: string;
  children: Array<string>;
}

const categoryRawData: Array<categoryRawType> = [
  {
    title: "Clothing, Shoes, Jewelry & Watches",
    children: [
      "Women",
      "Men",
      "Girls",
      "Boys",
      "Baby",
      "Luggage",
      "The Drop",
      "Prime Wardrobe",
      "Sales & Deals",
    ],
  },
  {
    title: "Electronics",
    children: [
      "TV & Video",
      "Home Audio & Theater",
      "Camera, Photo & Video",
      "Cell Phones & Accessories",
      "Headphones",
      "Bluetooth & Wireless Speakers",
      "Car Electronics",
      "Musical Instruments",
      "Wearable Technology",
    ],
  },
  {
    title: "Toys, Kids & Baby",
    children: [
      "Toys & Games",      
      "Diapering",
      "Video Games for Kids",
      "Baby Registry",
      "Kids Birthdays",
    ],
  },
  {
    title: "Sports",
    children: [
      "Athletic Clothing",
      "Exercise & Fitness",
      "Hunting & Fishing",
      "Team Sports",
      "Golf",
      "Fan Shop",
      "Leisure Sports & Game Room",
      "Sports Collectibles",
      "All Sports & Fitness",
      "New Gear Innovations",
    ],
  },
  {
    title: "Outdoors",
    children: [
      "Outdoor Clothing",
      "Camping & Hiking",
      "Climbing",
      "Cycling",
      "Scooters, Skateboards & Skates",
      "Water Sports",
      "Winter Sports",      
      "All Outdoor Recreation",
    ],
  },
  {
    title: "Kindle Store",
    children: ["Kindle eBooks", "Kindle Unlimited", "Prime Reading"],
  },
  {
    title: "Movies, Music & Games",
    children: [
      "Movies & TV",
      "Blu-ray",
      "Prime Video-Included with Prime",
      "Video Shorts",
      "CDs & Vinyl",
      "Digital Music",      
      "Video Games",
      "PC Gaming",
      "Digital Games",
      "Entertainment Collectibles",
      "Trade In Video Games",
    ],
  },
  {
    title: "Computers",
    children: [
      "Computers, Tablets, & PC Products",
      "Monitors",
      "Accessories",
      "Networking",
      "Drives & Storage",
      "Computer Parts & Components",
      "Printers & Ink",
      "Software",
      "Office & School Supplies",
      "Trade In Your Electronics",
    ],
  },
  {
    title: "Tools & Home Improvement",
    children: [
      "Home Improvement",
      "Power & Hand Tools",
      "Lamps & Light Fixtures",
      "Kitchen & Bath Fixtures",
      "Cookware",
      "Hardware",
      "Smart Home",
      "Bargain Finds",
    ],
  },
  {
    title: "Pet Supplies",
    children: [
      "Pet Profiles",
      "Dog Supplies",
      "Dog Food",
      "Cat Supplies",
      "Cat Food",
      "Fish & Aquatic Pets",
      "Small Animals",
      "Birds",
    ],
  },
  {
    title: "Beauty, Health & Personal Care",
    children: [
      "Premium Beauty",
      "Professional Skin Care",
      "Salon & Spa",
      "Men’s Grooming",
      "Health, Household & Baby Care",      
    ],
  },
  {
    title: "Health & Houshold",
    children: [
      "Vitamins & Dietary Supplements",
      "Household Supplies",
      "Health Care",
      "Sports Nutrition",
      "Baby & Child Care",
      "Medical Supplies & Equipment",
      "Health & Wellness",
    ],
  },
  {
    title: "Automotive",
    children: [
      "Automotive Parts & Accessories",
      "Automotive Tools & Equipment",
      "Car/Vehicle Electronics & GPS",
      "Tires & Wheels",
      "Motorcycle & Powersports",
      "RV Parts & Accessories",
      "Vehicles",
      "Your Garage",
    ],
  },
  {
    title: "Industrial & Scientific",
    children: [
      "Industrial Supplies",
      "Lab & Scientific",
      "Janitorial",
      "Safety",
      "Food Service",
      "Material Handling",
    ],
  },
  {
    title: "Gift Cards",
    children: [
      "eGift cards",
      "Gift cards by mail",
      "Reload your balance",
      "Amazon Cash",
      "Third - party gift cards",
    ],
  },
];

interface categoryType {
  title: string;
  key: string;
  children?: Array<categoryType>;
}

export const categoryData: Array<categoryType> = categoryRawData.map(
  (rd, idx) => {
    const cd: categoryType = {
      key: rd.title,
      title: rd.title,
    };
    if (rd && !!rd.children.length) {
      cd.children = rd.children.map((c, idy) => {
        return {
          key: c,
          title: c,
        };
      });
    }
    return cd;
  }
);
