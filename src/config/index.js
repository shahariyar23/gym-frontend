export const registerFromControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
  {
    name: "avater",
    label: "Avater",
    placeholder: "Enter your Avater",
    componentType: "input",
    type: "file",
  },
];

export const loginFromControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addCourseFromElement = [
  {
    label: "Titel",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter the Course title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter the Course details",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "strengthtraining", label: "Strength Training" },
      { id: "cardioendurance", label: "Cardio & Endurance" },
      { id: "flexibilitymobility", label: "Flexibility & Mobility" },
      { id: "Mind-Body", label: "Mind-Body" },
    ],
  },
  {
    label: "Gym Type",
    name: "gymType",
    componentType: "select",
    options: [
      { id: "boxinggym", label: "Boxing Gym" },
      { id: "yogastudio", label: "Yoga Studio" },
      { id: "meWomengymn", label: "Women's-Only Gym" },
      { id: "24Gym", label: "24-Hour Gym" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter the Course price",
  },
  {
    label: "Offer Price",
    name: "offerPrice",
    componentType: "input",
    type: "number",
    placeholder: "Offer price",
  },
];
export const addAccessoriesFromElement = [
  {
    label: "Titel",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter the accessories title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter the accessories details",
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "input",
    type: "text",
    placeholder: "Brand name",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      {
        id: "StrengthTrainingAccessories",
        label: "Strength Training Accessories",
      },
      {
        id: " CardioEquipmentAccessories",
        label: " Cardio Equipment Accessories",
      },
      { id: "Recovery&MobilityTools", label: "Recovery and Mobility Tools" },
      { id: "Storage&Organization", label: "Storage and Organization" },
    ],
  },
  {
    label: "Type",
    name: "type",
    componentType: "select",
    options: [
      { id: "WeightliftingBelts", label: "Weightlifting belts" },
      { id: "JumpRopes", label: "Jump ropes" },
      { id: "FoamRollers", label: "Foam rollers" },
      { id: "GymBags", label: "Gym bags" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter the accessories price",
  },
  {
    label: "Offer Price",
    name: "offerPrice",
    componentType: "input",
    type: "number",
    placeholder: "Offer price",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "stock",
  },
];

export const gymViewMenuItem = [
  {
    id: "home",
    label: "Home",
    path: "/gym/dashboard",
  },
  {
    id: "gym",
    label: "Gym",
    path: "/gym/listing",
  },
  {
    id: "Women's-Only Gym",
    label: "Woman Gym",
    path: "/gym/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/gym/accessories",
  },
  {
    id: "search",
    label: "Search",
    path: "/gym/search",
  },
];

export const filterOptions = {
  Category: [
    { id: "Strength Training", label: "Strength Training" },
    { id: "Cardio & Endurance", label: "Cardio & Endurance" },
    { id: "Flexibility & Mobility", label: "Flexibility & Mobility" },
    { id: "Mind-Body", label: "Mind-Body" },
  ],
  Type: [
    { id: "Boxing Gym", label: "Boxing Gym" },
    { id: "Yoga Studio", label: "Yoga Studio" },
    { id: "Women's-Only Gym", label: "Women's-Only Gym" },
    { id: "24-Hour Gym", label: "24-Hour Gym" },
  ],
};
export const filterOptionsAccessories = {
  Category: [
    {
      id: "Strength Training Accessories",
      label: "Strength Training Accessories",
    },
    {
      id: " Cardio Equipment Accessories",
      label: " Cardio Equipment Accessories",
    },
    { id: "Recovery and Mobility Tools", label: "Recovery and Mobility Tools" },
    { id: "Storage and Organization", label: "Storage and Organization" },
  ],
  Type: [
    { id: "Weightlifting belts", label: "Weightlifting belts" },
    { id: "Jump ropes", label: "Jump ropes" },
    { id: "Foam rollers", label: "Foam rollers" },
    { id: "Gym bags", label: "Gym bags" },
  ],
};

export const sortOptions = [
  {
    id: "nameAsc",
    name: "nameAsc",
    label: "Name (A - Z)",
  },
  {
    id: "nameDesc",
    name: "nameDesc",
    label: "Name (Z - A)",
  },
  {
    id: "priceAsc",
    name: "priceAsc",
    label: "Price (Low to High)",
  },
  {
    id: "priceDesc",
    name: "priceDesc",
    label: "Price (High to Low)",
  },
  {
    id: "dateAsc",
    name: "dateAsc",
    label: "Date (Oldest First)",
  },
  {
    id: "dateDesc",
    name: "dateDesc",
    label: "Date (Newest First)",
  },
];

export const addressFromControll = [
  {
    name: "name",
    label: "Full Name",
    placeholder: "Enter your full name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter your address",
    componentType: "input",
    type: "text",
  },
  {
    name: "city",
    label: "City",
    placeholder: "Enter your city",
    componentType: "input",
    type: "text",
  },
  {
    name: "distric",
    label: "Distric",
    placeholder: "Enter your distric",
    componentType: "input",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter your Phone number",
    componentType: "input",
    type: "number",
  },
  {
    name: "notes",
    label: "Notes",
    placeholder: "Add additional address like road, house",
    componentType: "input",
    type: "text",
  },
];
