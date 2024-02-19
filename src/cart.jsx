"use client";

import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import useGetMyCarts from "@/Hooks/Carts/useGetMyCarts";
import PageLoading from "../Shared/loadingPageBook/PageLoading";
import useAuth from "@/Hooks/auth/useAuth";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import { useRouter } from "next/navigation";

const Cart = () => {
   const { carts, books, price, quantity, isPending, refetch } = useGetMyCarts();
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();
   const router = useRouter()

   if(isPending){
    return <PageLoading/>
   }

   let totalPrice = price || 0;
   console.log(quantity);
  console.log(carts);

//   const handleDelete = (cartId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//       carts?.map((cart) => {
//           if (cart?.book_id === bookId) {
//             cartId = cart?._id;
//           }
//         });
//         if (cartId) {
//           axios
//             .delete(
//               `https://boi-binimoy-server.vercel.app/api/v1/delete-cart/${cartId}`
//             )
//             .then((response) => {
//               Swal.fire({
//                 title: "Deleted!",
//                 text: "Your file has been deleted.",
//                 icon: "success",
//               });
//                 carts?.map((cart) => {
//                 if (cart?.book_id === bookId) {
//                   totalPrice = totalPrice - cart?.price;
//                 }
//               });
//             })
//             .catch((error) => {
//               console.error(error);
//             });
//         }
//       }
//     });
//   };



 const handleCheckout = async() => {
    const email = await user?.email;
    const data = {
        email
    }
    const res  = await axiosSecure.post("/api/v1/order", data);
    console.log(res.data);
    if(res?.data){
        const url = await res.data.url
       router.push(url)
    }
    window.location.replace(res?.data?.url)
 }


  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="grid grid-cols-2 gap-5">
        {books?.map((book) => (
          <div key={book?._id}>
            <div className="flex gap-5 border-2 border-gray-600 rounded-lg p-5">
              <Image
                src={book?.cover_image}
                width={500}
                height={500}
                alt="book"
                priority
                style={{ width: "150px", height: "200px" }}
              />
              <div>
                <h2>Book Name: {book?.title}</h2>
                <h2>Book Writer: {book?.writer}</h2>
                <h2>Book category: {book?.category}</h2>
                <h2>Book Price: {book?.price} BDT</h2>
                <button
                  
                  className="mt-5 button-color px-4 py-2 rounded-full text-sm md:text-base text-white flex items-center gap-1"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-semibold">
            Total quantity: {quantity}
          </h2>
          <h2 className="text-3xl font-semibold mt-3">
            Total price: {totalPrice} BDT
          </h2>
        </div>
        <div>
          <button 
          onClick={handleCheckout}
          className="button-color px-4 py-2 rounded-full text-sm md:text-base text-white flex items-center gap-1">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;