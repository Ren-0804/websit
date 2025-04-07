import { Mail, MapPin, Phone } from "lucide-react"

export default function BusinessCard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Front Side */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          {/* Left side with blue accent */}
          <div className="w-full md:w-1/3 bg-blue-600 p-6 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <div className="text-blue-600 font-bold text-2xl">丰</div>
              </div>
              <h1 className="text-white font-bold text-xl mb-1">丰吉国际</h1>
              <div className="h-1 w-12 bg-white mb-4"></div>
            </div>
            <div className="text-white text-xs">Global Connections · Smooth Supply Chain</div>
          </div>

          {/* Right side with contact info */}
          <div className="w-full md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">任奕铮</h2>
                <p className="text-sm text-gray-600">Ren Yizheng</p>
                <div className="h-0.5 w-12 bg-blue-600 my-2"></div>
                <p className="text-sm font-medium text-gray-700 mt-2">国际市场部经理</p>
                <p className="text-xs text-gray-600">International Marketing Manager</p>
              </div>
              <div className="w-24 h-24">
                <div className="border-2 border-gray-200 rounded-lg p-1">
                  <div className="bg-gray-100 rounded w-full h-full flex items-center justify-center">
                    <span className="text-xs text-gray-500">QR Code</span>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-500 mt-1">Scan to connect</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-blue-600 mr-2" />
                <p className="text-sm text-gray-700">+86 17374932331 (China/WeChat)</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-blue-600 mr-2" />
                <p className="text-sm text-gray-700">renyizheng@landsea.cc</p>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700">Room 2403, Building C, Sunshine International,</p>
                  <p className="text-sm text-gray-700">Lianyungang District, China (Jiangsu) Pilot Free Trade Zone</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Side */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <div className="text-white font-bold text-xl">丰</div>
            </div>
            <h1 className="text-blue-600 font-bold text-xl">丰吉国际</h1>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-gray-700">连接全球·畅通供应链</p>
            <p className="text-xs text-gray-600">Global Connections · Smooth Supply Chain</p>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-bold text-blue-600 border-b border-blue-600 pb-1 mb-3">
              我们的服务 / Our Services
            </h2>
            <p className="text-xs text-gray-700 mb-3">
              中欧、中亚、中俄等国际班列的主要服务商之一，义乌、连云港、青岛、郑州、西安及其他班列平台的紧密合作伙伴，从UZB到义乌、金华、西安、郑州、连云港、青岛及东南亚、日本、韩国等。
            </p>
            <p className="text-xs text-gray-700 mb-3">我们在塔什干、撒马尔罕、阿拉木图、连云港、西安等地设有办事处。</p>
            <p className="text-xs text-gray-600 mb-3">
              One of the main service providers of China-Europe, China-Central Asia and China-Russia international
              blocktrain, etc. A close agent of Yiwu, Lianyungang, Qingdao, Zhengzhou, Xi'an and other blocktrain
              platforms returning blocktrains from UZB, KAZ to Yiwu, Jinhua, Xi'an, Zhengzhou, Lianyungang, Qingdao and
              transit transport of the Southeast Asia, Japan, South Korea, etc.
            </p>
            <p className="text-xs text-gray-600">
              We have offices in Tashkent, Samarkand, Almaty, Lianyungang and Xi'an, etc.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["塔什干", "撒马尔罕", "阿拉木图", "连云港", "西安", "义乌", "青岛"].map((location) => (
              <span key={location} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {location}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

