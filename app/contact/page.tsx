export default function ContactPage() {
  return (
    <div className="container py-12 mx-auto">
      <main className="container mx-auto py-12 bg-gray-100 rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-600">联系我们</h1>
        <p className="text-gray-700 mb-4">有意者请联系：</p>
        <p className="text-gray-700 mb-4">Telegram: @akoozh</p>
        <p className="text-gray-700 mb-4">13776598380（微信同号）</p>
        <p className="text-gray-700 mb-4">17374032331（微信同号）</p>
      </main>
      <p className="mt-4 text-muted-foreground">请填写下表获取专属报价</p>
      {/* 这里后续可以添加联系表单 */}
    </div>
  )
}