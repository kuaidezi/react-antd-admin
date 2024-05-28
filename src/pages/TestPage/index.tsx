import { FC, useState } from "react";

class CancelToken {
  isCancelled: boolean;
  cancelCallback: ((reason: string) => void) | null;
  promise: Promise<void>;

  constructor() {
    this.isCancelled = false;
    this.cancelCallback = null;
    this.promise = new Promise((_, reject) => {
      this.cancelCallback = (reason: string) => {
        this.isCancelled = true;
        reject(reason);
      };
    });
  }

  cancel(reason: string) {
    if (this.cancelCallback) {
      this.cancelCallback(reason);
    }
  }

  token() {
    return this;
  }
}

const TestPage: FC = () => {
  const [cancelToken, setCancelToken] = useState<CancelToken | null>(null);

  const [loading, setLoading] = useState(false);

  const showLoading = (token?: CancelToken) => {
    const fn = (_cancelToken: CancelToken) => {
      return new Promise((resolve, reject) => {
        // 创建 XMLHttpRequest 对象
        const xhr = new XMLHttpRequest();

        // 监听请求完成事件
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            // 请求成功
            resolve(xhr.responseText);
          }
        };

        // 监听请求中止事件
        xhr.onabort = function () {
          console.log("Request aborted");
        };

        // 监听请求错误事件
        xhr.onerror = function () {
          console.error("Request error");
        };

        // 打开并发送请求
        xhr.open("GET", "https://api.oick.cn/api/lishi", true);
        xhr.send();
        console.log(_cancelToken);
        _cancelToken.promise.catch((e) => {
          xhr.abort();
          reject("Cancelled by user2222222");
        });
      });
    };

    return fn(token || new CancelToken());
  };

  const handleShowLoading = () => {
    const c = new CancelToken();
    setCancelToken(c);
    setLoading(true);
    showLoading(c.token())
      .then((result) => {
        console.log("Loading completed:", result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const handleCancel = () => {
    if (cancelToken) {
      cancelToken.cancel("Cancelled by user11111111");
    }
  };

  return (
    <div>
      <button onClick={handleShowLoading}>showLoading</button>
      <button onClick={handleCancel}>cancel</button>
      <p>将网络调慢些</p>
      {loading && <p>请求中！！！！！</p>}
    </div>
  );
};

export default TestPage;
