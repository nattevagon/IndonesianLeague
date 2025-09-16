import { Services } from "@/service";
import useModalStore from "@/store/useModalStore";
import { useValidators } from "./validators";

export const useTeamActions = (router) => {
  const { asPath, pathname, query } = router;
  const { openModal, closeModal, setLoading } = useModalStore();
  const {
    validationName,
    validationSelect
  } = useValidators();

  const handleCompetitionId = (competitionId) => {
    if (competitionId === 0) {
      return {
        id: competitionId,
        name: "False"
      };
    }
    else if (competitionId === 1) {
      return {
        id: competitionId,
        name: "True"
      };
    }
  }

  const handleCreate = (data, callback) => {
    openModal(
      "Create Team",
      "Are you sure you want to create this competition?",
      async () => {
        try {
          if (validationName(data?.name, 6)) {
            if (typeof callback === "function") {
              const callbackData = {
                status: false,
                name: 'name',
                message: validationName(data?.name, 6)
              }
              closeModal();
              callback(callbackData);
            }
            return;
          }

          if (validationSelect(data?.competition_id)) {
            if (typeof callback === "function") {
              const callbackData = {
                status: false,
                name: 'competition_id',
                message: validationSelect(data?.competition_id)
              }
              closeModal();
              callback(callbackData);
            }
            return;
          }

          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .post(`/api/post/teams/`, data)
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
      "Update Team",
      "Are you sure you want to change this competition?",
      async () => {
        try {
          if (validationName(data?.name, 6)) {
            if (typeof callback === "function") {
              const callbackData = {
                status: false,
                name: 'name',
                message: validationName(data?.name, 6)
              }
              closeModal();
              callback(callbackData);
            }
            return;
          }

          if (validationSelect(data?.competition_id)) {
            if (typeof callback === "function") {
              const callbackData = {
                status: false,
                name: 'competition_id',
                message: validationSelect(data?.competition_id)
              }
              closeModal();
              callback(callbackData);
            }
            return;
          }

          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .put(`/api/put/teams/` + id, data)
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
      "Delete Team",
      "Are you sure you want to delete this competition?",
      async () => {
        try {
          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .put(`/api/put/teams/delete/` + id)
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
      "Restore Team",
      "Are you sure you want to restore this competition?",
      async () => {
        try {
          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .put(`/api/put/teams/restore/` + id)
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
      'Delete Team',
      'Are you absolutely sure you want to permanently delete this competition? This action cannot be undone and may cause inconsistencies in competition data.',
      async () => {
        try {
          setLoading(true);
          Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
            .delete(`/api/delete/teams/` + id)
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

  return { handleCompetitionId, handleCreate, handleUpdate, handleSoftDelete, handleRestore, handleHardDelete };
};