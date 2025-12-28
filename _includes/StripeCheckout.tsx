const stage: string = "prd";

const STRIPE_PUBLIC_KEY = stage === "prd"
  ? Deno.env.get("STRIPE_PUBLIC_LIVE_KEY")
  : Deno.env.get("STRIPE_PUBLIC_TEST_KEY");

const STRIPE_PUBLIC_API = stage === "prd"
  ? Deno.env.get("STRIPE_PUBLIC_LIVE_API")
  : Deno.env.get("STRIPE_PUBLIC_TEST_API");

export const StripeCheckout = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl mb-6">
            <span className="text-4xl">💖</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            応援チケットのご購入
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto">
          </div>
        </div>

        <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 md:p-10 shadow-lg">
          <p className="text-gray-600 leading-relaxed mb-8 text-center md:text-left">
            チケットは、「コーヒーチケット」「ランチチケット」からお選びいただけます。<br />
            <span className="text-sm text-gray-500">
              ※ 領収書の発行には対応しておりません。あらかじめご了承ください。
            </span>
          </p>

          <div id="checkout-form" className="space-y-6">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="peer w-full border-2 border-gray-200 rounded-xl px-4 pt-6 pb-3 placeholder-transparent focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                placeholder="メールアドレス"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-pink-600"
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
                className="peer w-full border-2 border-gray-200 rounded-xl px-4 pt-6 pb-3 placeholder-transparent focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                placeholder="お名前"
              />
              <label
                htmlFor="fullName"
                className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-pink-600"
              >
                📛 お名前
              </label>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-4">
                🎟️ チケット選択
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 has-[:checked]:border-pink-500 has-[:checked]:bg-pink-50 has-[:checked]:shadow-md">
                  <input
                    type="radio"
                    name="ticket"
                    value="coffee"
                    className="w-5 h-5 text-pink-500 focus:ring-pink-500 focus:ring-2"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">
                        ☕ コーヒーチケット
                      </span>
                      <span className="text-lg font-bold text-pink-600">
                        ¥400
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      1杯のコーヒー分の応援
                    </p>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 has-[:checked]:border-pink-500 has-[:checked]:bg-pink-50 has-[:checked]:shadow-md">
                  <input
                    type="radio"
                    name="ticket"
                    value="lunch"
                    className="w-5 h-5 text-pink-500 focus:ring-pink-500 focus:ring-2"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">
                        🍝 ランチチケット
                      </span>
                      <span className="text-lg font-bold text-pink-600">
                        ¥1,200
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      1食分のランチの応援
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                id="submit-button"
                className="w-full px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <span>💖</span>
                <span>応援する</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Stripe決済で安全</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>SSL暗号化通信</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="https://js.stripe.com/v3/"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const STRIPE_PUBLIC_KEY = "${STRIPE_PUBLIC_KEY}";
            const STRIPE_PUBLIC_API = "${STRIPE_PUBLIC_API}";
            const stripe = Stripe(STRIPE_PUBLIC_KEY);

            const button = document.getElementById("submit-button");
            button.addEventListener("click", async (e) => {
              e.preventDefault();
              
              const originalText = button.innerHTML;
              button.disabled = true;
              button.innerHTML = '<svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';

              const email = document.getElementById("email").value;
              const fullName = document.getElementById("fullName").value;
              const ticket = document.querySelector("input[name='ticket']:checked")?.value;

              if (!email || !fullName || !ticket) {
                alert("すべての情報を入力してください");
                button.disabled = false;
                button.innerHTML = originalText;
                return;
              }

              try {
                const res = await fetch(STRIPE_PUBLIC_API, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, full_name: fullName, type: ticket }),
                });

                const data = await res.json();
                window.location.href = data.url;
              } catch (error) {
                alert("エラーが発生しました。もう一度お試しください。");
                button.disabled = false;
                button.innerHTML = originalText;
              }
            });
          `,
        }}
      />
    </>
  );
};
