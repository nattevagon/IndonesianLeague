import { Services } from "@/service";
import useModalStore from "@/store/useModalStore";
import { useValidators } from "./validators";

export const useNewsActions = (router) => {
  const { asPath, pathname, query } = router;
  const { openModal, closeModal, setLoading } = useModalStore();
  const {
    validationName,
    validationSelect
  } = useValidators();

  const handleIsPublish = (isPublish) => {
    if (isPublish === 0) {
      return {
        id: isPublish,
        name: "False"
      };
    }
    else if (isPublish === 1) {
      return {
        id: isPublish,
        name: "True"
      };
    }
  }

  const handleCreate = (data, callback) => {
    openModal(
      "Create News",
      "Are you sure you want to create this news?",
      async () => {
        try {
          if (validationName(data?.title, 6)) {
            if (typeof callback === "function") {
              const callbackData = {
                status: false,
                name: 'title',
                message: validationName(data?.title, 6)
              }
              closeModal();
              callback(callbackData);
            }
            return;
          }

          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .post(`/api/post/news/`, data)
            .then((getResponse) => {
              const result = getResponse.data;

              if (result?.code === 200) {
                setLoading(false);
                closeModal();

                if (typeof callback === "function") {
                  const callbackData = {
                    status: true,
                    message: result.message
                  }
                  callback(callbackData);
                }
              }
            })
            .catch(() => {
              setLoading(false);
            });
        } catch (err) {
          setLoading(false);
        }
      }
    );
  }

  const handleUpdate = (id, data, callback) => {
    console.log('update')
    openModal(
      "Update News",
      "Are you sure you want to change this news?",
      async () => {
        try {
          if (validationName(data?.title, 6)) {
            if (typeof callback === "function") {
              const callbackData = {
                status: false,
                name: 'title',
                message: validationName(data?.title, 6)
              }
              closeModal();
              callback(callbackData);
            }
            return;
          }

          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .put(`/api/put/news/` + id, data)
            .then((getResponse) => {
              const result = getResponse.data;

              if (result) {
                if (result.code === 200) {
                  setLoading(false);
                  closeModal();

                  if (typeof callback === "function") {
                    const callbackData = {
                      status: true,
                      message: result.message
                    }
                    callback(callbackData);
                  }
                }
              }
            })
            .catch((error) => {
              setLoading(false);
            });
        } catch (err) { }
      }
    );
  }

  const handleSoftDelete = (id, callback) => {
    openModal(
      "Delete News",
      "Are you sure you want to delete this news?",
      async () => {
        try {
          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .put(`/api/put/news/delete/` + id)
            .then((getResponse) => {
              const result = getResponse.data;

              if (result && result.code === 200) {
                setLoading(false);
                closeModal();

                if (typeof callback === "function") {
                  callback(result);
                }
              }
            })
            .catch(() => {
              setLoading(false);
            });
        } catch (err) {
          setLoading(false);
        }
      }
    );
  };

  const handleRestore = (id, callback) => {
    openModal(
      "Restore News",
      "Are you sure you want to restore this news?",
      async () => {
        try {
          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .put(`/api/put/news/restore/` + id)
            .then((getResponse) => {
              const result = getResponse.data;

              if (result?.code === 200) {
                setLoading(false);
                closeModal();

                if (typeof callback === "function") {
                  callback(result);
                }
              }
            })
            .catch(() => {
              setLoading(false);
            });
        } catch (err) {
          setLoading(false);
        }
      }
    );
  };

  const handleHardDelete = (id, callback) => {
    openModal(
      'Delete News',
      'Are you absolutely sure you want to permanently delete this news? This action cannot be undone and may cause inconsistencies in news data.',
      async () => {
        try {
          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .delete(`/api/delete/news/` + id)
            .then((getResponse) => {
              const result = getResponse.data;

              if (result) {
                if (result.code === 200) {
                  setLoading(false);
                  closeModal();

                  if (typeof callback === "function") {
                    callback(result);
                  }
                }
              }
            })
            .catch((error) => {
              setLoading(false);
            });
        } catch (err) { }
      });
  };

  return { handleIsPublish, handleCreate, handleUpdate, handleSoftDelete, handleRestore, handleHardDelete };
};