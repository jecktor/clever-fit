export const userInputs = [
  {
    id: "locker",
    label: "Locker",
    type: "boolean",
    options: [
      { value: true, label: "si" },
      { value: false, label: "No" }
    ],
    placeholder: "Seleccione una opción",
  },
    {
      id: "name",
      label: "Nombre",
      type: "text",
      placeholder: "John Doe",
    },
    {
      id: "email",
      label: "Email",
      type: "mail",
      placeholder: "john_doe@gmail.com",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
    },
    {
      id: "subscription",
      label: "Suscripción",
      type: "boolean",
      placeholder: "Si",
    },
    {
      id: "tiposubs",
      label: "tipo de Suscripción",
      type: "text",
      placeholder: "pro",
    },
  ];
  
  export const productInputs = [
    {
      id: 1,
      label: "Title",
      type: "text",
      placeholder: "Apple Macbook Pro",
    },
    {
      id: 2,
      label: "Description",
      type: "text",
      placeholder: "Description",
    },
    {
      id: 3,
      label: "Category",
      type: "text",
      placeholder: "Computers",
    },
    {
      id: 4,
      label: "Price",
      type: "text",
      placeholder: "100",
    },
    {
      id: 5,
      label: "Stock",
      type: "text",
      placeholder: "in stock",
    },
  ];
  