// @ts-types="npm:@types/react"
import React, { useState } from "npm:react";
import { Stripe } from "npm:stripe";

declare global {
  interface Window {
    Stripe: any;
  }
}

export function StripeCheckout() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [loading, setLoading] = useState(false);

  const stage = "prd"; // "stg" or "prd"
  const STRIPE_PUBLIC_KEY = stage === "prd"
    ? "pk_live_51HXFQ2JjS3tjeKPCAnuLuXdHqCv5tqHYnB4YuqEmdKecXxvvfqAUZUilNx2eY439pUcMQ7CvdQBNbz2lHhRlXWHq00527MJzN4"
    : "pk_test_51HXFQ2JjS3tjeKPC5CsKbnQqDR9Gmtc64PI31k7AN6F18Beic4TQDkztYzmMmVfwf6KBZ2Gt0yqgltWzDGwiyycb008x2VGN5E";

  const STRIPE_PUBLIC_API = stage === "prd"
    ? "https://nekohack-ticket-prd.jiyuujinunite.workers.dev/api/purchase"
    : "https://nekohack-ticket-stg.jiyuujinunite.workers.dev/api/purchase";

  // const stripe = new Stripe(STRIPE_PUBLIC_KEY)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("メールアドレスを入力してください。");
      return;
    }

    if (!fullName.trim()) {
      alert("氏名を入力してください。");
      return;
    }

    if (!ticketType) {
      alert("チケットを選択してください。");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(STRIPE_PUBLIC_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          full_name: fullName,
          type: ticketType,
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        alert("エラー: " + error);
        return;
      }

      const data = await res.json();

      const stripe = window.Stripe(STRIPE_PUBLIC_KEY);
      stripe.redirectToCheckout({ sessionId: data.sessionId });
      // window.location.href = data.url
    } catch (err) {
      console.error(err);
      alert("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-[14px] shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        チケットを選択してください
      </h2>
      <p className="text-left text-gray-600 mb-6">
        チケットは、「コーヒーチケット」「ランチチケット」「応援チケット」からお選びいただけます。<br />
        ※ 領収書の発行には対応しておりません。あらかじめご了承ください。
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full border border-gray-300 rounded-md px-4 pt-5 pb-2 placeholder-transparent focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            placeholder="メールアドレス"
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-500"
          >
            📩 メールアドレス
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="peer w-full border border-gray-300 rounded-md px-4 pt-5 pb-2 placeholder-transparent focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            placeholder="お名前"
          />
          <label
            htmlFor="fullName"
            className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-500"
          >
            📛 お名前
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🎟️ チケット選択
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="ticket"
                value="coffee"
                checked={ticketType === "coffee"}
                onChange={() => setTicketType("coffee")}
                className="text-pink-500 focus:ring-pink-500"
              />
              <span className="ml-2">☕ コーヒーチケット（¥400）</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="ticket"
                value="lunch"
                checked={ticketType === "lunch"}
                onChange={() => setTicketType("lunch")}
                className="text-pink-500 focus:ring-pink-500"
              />
              <span className="ml-2">🍝 ランチチケット（¥1,200）</span>
            </label>
          </div>
        </div>
        <div className="pt-4 text-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-auto px-6 py-2 rounded font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#EC43C1] hover:bg-[#A91D85] text-white"
            }`}
          >
            {loading ? "処理中..." : "💖 応援する"}
          </button>
        </div>
      </form>
    </div>
  );
}
