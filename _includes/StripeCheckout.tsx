const stage: string = "prd";

const STRIPE_PUBLIC_KEY = stage === "prd"
  ? Deno.env.get("STRIPE_PUBLIC_LIVE_KEY")
  : Deno.env.get("STRIPE_PUBLIC_TEST_KEY");

const STRIPE_PUBLIC_API = stage === "prd"
  ? Deno.env.get("STRIPE_PUBLIC_LIVE_API")
  : Deno.env.get("STRIPE_PUBLIC_TEST_API");

export function StripeCheckout() {
  return (
    <>
      <div className="mx-auto mt-10 p-6">
        <div className="flex items-center my-12">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-600 text-sm font-medium whitespace-nowrap">
            応援チケットのご購入
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <p className="text-left text-gray-600 mb-6">
          チケットは、「コーヒーチケット」「ランチチケット」「応援チケット」からお選びいただけます。<br />
          ※ 領収書の発行には対応しておりません。あらかじめご了承ください。
        </p>
        <form id="checkout-form" className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              required
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
                  className="text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2">☕ コーヒーチケット（¥400）</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ticket"
                  value="lunch"
                  className="text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2">🍝 ランチチケット（¥1,200）</span>
              </label>
            </div>
          </div>
          <div className="pt-4 text-center">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 rounded font-semibold transition bg-[#EC43C1] hover:bg-[#A91D85] text-white"
            >
              💖 応援する
            </button>
          </div>
        </form>
      </div>
      <script src="https://js.stripe.com/v3/"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const STRIPE_PUBLIC_KEY = "${STRIPE_PUBLIC_KEY}";

            const STRIPE_PUBLIC_API = "${STRIPE_PUBLIC_API}";

            const stripe = Stripe(STRIPE_PUBLIC_KEY)

            const form = document.getElementById("checkout-form");
            form.addEventListener("submit", async (e) => {
              e.preventDefault();
              const email = document.getElementById("email").value;
              const fullName = document.getElementById("fullName").value;
              const ticket = document.querySelector("input[name='ticket']:checked")?.value;

              if (!email || !fullName || !ticket) {
                alert("すべての情報を入力してください");
                return;
              }

              console.log(email, fullName, ticket);
              const res = await fetch(STRIPE_PUBLIC_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, full_name: fullName, type: ticket }),
              });

              const data = await res.json();
              window.location.href = data.url;
            });
          `,
        }}
      />
    </>
  );
}
