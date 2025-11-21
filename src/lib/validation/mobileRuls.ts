export const mobileRules = [
    { required: true, message: "لطفاً شماره موبایل را وارد کنید." },
    {
      pattern: /^0\d{10}$/,
      message: "شماره موبایل باید ۱۱ رقم و با صفر شروع شود.",
    },
  ];
  