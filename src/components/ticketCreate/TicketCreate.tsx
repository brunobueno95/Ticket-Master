import styles from "./page.module.css";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { IoIosPaperPlane } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateTicket from "../../hooks/useCreateTicket";

interface Props {
  openPopBox: (status: boolean) => void;
  setInformation: (info: string) => void;
}

const schema = z.object({
  name: z.string().min(5, { message: "5 characters or more" }),
  email: z.string().email({ message: "not valid email" }),
  problem: z.string().min(5, { message: "10 character or more" }),
});

type FormData = z.infer<typeof schema>;

const TicketCreate = ({ openPopBox, setInformation }: Props) => {
  const createTicket = useCreateTicket();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: {
    name: string;
    email: string;
    problem: string;
  }) => {
    if (isValid) {
      console.log(data);
      openPopBox(true);
      createTicket.mutate(data, {
        onSuccess: () => {
          console.log("Ticket created successfully");
          setInformation("Your ticket was sent successfully");
          reset();
        },
        onError: (error) => {
          console.error("Ticket creation failed", error);
          setInformation("Ticket creation failed");
        },
      });
    }

    if (createTicket.isPending) {
      setInformation("Loading...");
    }
  };

  return (
    <div className={styles.fullTicket}>
      <div className={styles.fTLedft}></div>
      <form className={styles.fTRight} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.titleTicket}>TICKET</h1>
        <div className={styles.inputsContainer}>
          <div className={styles.inputAndValidation}>
            <div className={styles.rowIconInput}>
              <FaUser className={styles.icon} />
              <input
                type="text"
                className={styles.inputTicket}
                placeholder="Full Name"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p style={{ color: "red", margin: "0 " }}>
                {errors.name.message}
              </p>
            )}
          </div>
          <div className={styles.inputAndValidation}>
            <div className={styles.rowIconInput}>
              <MdEmail className={styles.icon} />
              <input
                type="text"
                className={styles.inputTicket}
                placeholder="Email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p style={{ color: "red", margin: "0 " }}>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className={styles.inputAndValidation}>
            <div className={styles.rowIconInput}>
              <RiMessage2Fill className={styles.icon} />
              <textarea
                className={styles.textAreaTicket}
                placeholder="Explain us your problem"
                {...register("problem")}
              />
            </div>
            {errors.problem && (
              <p style={{ color: "red", margin: "0 " }}>
                {errors.problem.message}
              </p>
            )}
          </div>
        </div>
        <button className={styles.sendBtn} type="submit">
          SEND <IoIosPaperPlane className={styles.btnIcon} />
        </button>
      </form>
    </div>
  );
};

export default TicketCreate;
