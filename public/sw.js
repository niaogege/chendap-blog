// console.log('In service worker test.');
var CACHE_NAME = "v1"

// 只缓存某一个域名下的文件
var domainWhitelist = ["https://s2.loli.net", "https://bythewayer.com/"]

function getWebUrl(url) {
  return (url += "?name=cpp")
}

self.addEventListener("install", function (event) {
  console.log("install")
  // sw版本内容安装或更新后立马激活
  self.skipWaiting()
})

self.addEventListener("activate", function (event) {
  console.log("activate", event)
  // 当 Service Worker 被首次注册时，已打开的页面只有在刷新后才会接受 Service Worker 的控制，如果想要 Service Worker 在激活后尽快掌握这些页面的控制权，可在 activate 中调用 self.clients.claim 方法来实现：
  event.waitUntil(clients.claim())
})
self.addEventListener("fetch", function (event) {
  console.log("CPP url::")
  const url = event.request.url
  var newRequest = new Request(getWebUrl(url), event.request)
  if (
    url.match(/\.(png|jpg|jpeg)/) &&
    domainWhitelist.find((wUrl) => url.startsWith(wUrl))
  ) {
    event.respondWith(
      caches.match(newRequest).then((res) => {
        return (
          res ||
          fetch(newRequest)
            .then((responese) => {
              const responeseClone = responese.clone()
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(newRequest, responeseClone)
              })
              return responese
            })
            .catch((err) => {
              console.log(err)
            })
        )
      })
    )
  }
})
