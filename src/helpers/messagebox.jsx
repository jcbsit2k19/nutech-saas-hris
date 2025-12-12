import Swal from "sweetalert2";

const Messagebox = {
  success: (title, message, onConfirm) => {
    Swal.fire({
      title: `<div class='text-2xl text-emerald-600 font-bold font-montserrat drop-shadow-sm'>${title}</div>`,
      html: `<div class='text-lg text-emerald-400 font-montserrat'>${message}</div>`,
      icon: "success",
      confirmButtonText: "OK",
      iconColor: "#10B981",
      customClass: {
        confirmButton:
          "px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-md shadow-md w-32 transition duration-200 font-montserrat",
        popup: "shadow-lg rounded-md bg-emerald-50 drop-shadow-md",
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      }
    });
  },

  info: (title, message, onConfirm) => {
    Swal.fire({
      title: `<div class='text-2xl text-blue-600 font-bold font-montserrat drop-shadow-sm'>${title}</div>`,
      html: `<div class='text-lg text-blue-400 font-montserrat'>${message}</div>`,
      icon: "info",
      confirmButtonText: "OK",
      iconColor: "#3B82F6",
      customClass: {
        confirmButton:
          "px-4 py-2 bg-blue-500 outline-blue-300 hover:bg-blue-600 rounded-md shadow-md w-32 transition duration-200 font-montserrat",
        popup: "shadow-lg rounded-md bg-blue-50 drop-shadow-md",
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      }
    });
  },

  confirm: (title, message, onConfirm) => {
    // Theme it to match the general style, but use a neutral background
    Swal.fire({
      title: `<div class='text-2xl text-blue-600 font-bold font-montserrat drop-shadow-sm'>${title}</div>`,
      html: `<div class='text-lg text-gray-600 font-montserrat'>${message}</div>`, //Gray text for message
      icon: "question",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      iconColor: "#3B82F6",
      customClass: {
        confirmButton:
          "px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md shadow-md w-32 transition duration-200 font-montserrat",
        cancelButton:
          "px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md shadow-md w-32 transition duration-200 font-montserrat", //Blue Button
        popup: "shadow-lg rounded-md bg-gray-50 drop-shadow-md",
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      }
    });
  },

  warning: (title, message, onConfirm) => {
    Swal.fire({
      title: `<div class='text-2xl text-yellow-600 font-bold font-montserrat drop-shadow-sm'>${title}</div>`,
      html: `<div class='text-lg text-yellow-400 font-montserrat'>${message}</div>`,
      icon: "warning",
      confirmButtonText: "OK",
      iconColor: "#F59E0B",
      customClass: {
        confirmButton:
          "px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md shadow-md w-32 transition duration-200 font-montserrat",
        popup: "shadow-lg rounded-md bg-yellow-50 drop-shadow-md",
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      }
    });
  },

  error: (title, message, onConfirm) => {
    Swal.fire({
      title: `<div class='text-2xl text-red-600 font-bold font-montserrat drop-shadow-sm'>${title}</div>`,
      html: `<div class='text-lg text-red-400 font-montserrat'>${message}</div>`,
      icon: "error",
      confirmButtonText: "OK",
      iconColor: "#EF4444",
      customClass: {
        confirmButton:
          "px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md shadow-md w-32 transition duration-200 font-montserrat",
        popup: "shadow-lg rounded-md bg-red-50 drop-shadow-md",
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      }
    });
  },
};

export default Messagebox;
