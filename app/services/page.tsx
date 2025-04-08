import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12 bg-gray-100 rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">中亚集装箱回程班列服务</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="h-2 bg-blue-600 w-full"></div>
          <CardHeader>
            <CardTitle>塔什干至中国班列</CardTitle>
            <CardDescription>常态化运行 | 10-12天时效</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <ul className="space-y-2 text-sm">
              <li>• 路径：塔什干-霍尔果斯-目的站</li>
              <li>• 到站：义乌/长沙/郑州/西安/高邑/连云港</li>
              <li>• 货物类型：过境货物</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="h-2 bg-blue-600 w-full"></div>
          <CardHeader>
            <CardTitle>北哈地区班列</CardTitle>
            <CardDescription>饲料专列 | 快速组列</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <ul className="space-y-2 text-sm">
              <li>• 路径：库斯塔奈/阿拉木图-阿拉山口</li>
              <li>• 到站：重庆/成都/郑州/西安等</li>
              <li>• 货物类型：小麦粉/大麦等</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="h-2 bg-blue-600 w-full"></div>
          <CardHeader>
            <CardTitle>配套服务</CardTitle>
            <CardDescription>全程物流解决方案</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <ul className="space-y-2 text-sm">
              <li>• 塔什干地接服务</li>
              <li>• 代理清关服务</li>
              <li>• 乌兹全境配送</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="h-2 bg-blue-600 w-full"></div>
          <CardHeader>
            <CardTitle>公路运输</CardTitle>
            <CardDescription>中亚国际线路</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-2 text-sm">
              <p>• 中国-中亚双向运输</p>
              <p>• 门到门运输服务</p>
              <p>• 特种货物运输</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden md:col-span-2">
          <div className="h-2 bg-blue-600 w-full"></div>
          <CardHeader>
            <CardTitle>联系方式</CardTitle>
            <CardDescription>24小时业务咨询</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 p-8">
            <div className="space-y-2">
              <p className="font-medium">电话咨询：</p>
              <Button variant="outline" className="w-full">137 - 7659 - 8380</Button>
              <Button variant="outline" className="w-full">173 - 7403 - 2331</Button>
            </div>
            <div className="space-y-2">
              <p className="font-medium">在线咨询：</p>
              <Button className="w-full">微信客服</Button>
              <Button className="w-full" variant="secondary">在线留言</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}