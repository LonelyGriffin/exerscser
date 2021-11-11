export default function makeCancellablePromise<T>(promise: Promise<T>) {
  let isCancelled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise
      .then((...args) => !isCancelled && resolve(...args))
      .catch((error) => !isCancelled && reject(error));
  });

  return {
    promise: wrappedPromise,
    cancel() {
      isCancelled = true;
    },
  };
}
