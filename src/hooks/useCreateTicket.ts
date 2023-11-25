import { useMutation, useQueryClient } from "@tanstack/react-query";
import TicketService from "../services/TicketService";
import { Ticket } from "../services/APIclient";

interface CreateTicketContext {
  previousTickets: Ticket[];
}

const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation<Ticket, Error, Ticket, CreateTicketContext>({
    mutationFn: TicketService.create,
    onMutate: (newTicket: Ticket) => {
      const previousTickets =
        queryClient.getQueryData<Ticket[]>(["ticket"]) || [];
      // queryClient.invalidateQueries({
      //     queryKey:['ticket']
      // })

      queryClient.setQueryData<Ticket[]>(["ticket"], (tickets = []) => [
        newTicket,
        ...tickets,
      ]);

     
      return { previousTickets };
    },
    onSuccess: (savedTicket, newTicket) => {
      queryClient.setQueryData<Ticket[]>(["ticket"], (tickets) =>
        tickets?.map((ticket) => (ticket === newTicket ? savedTicket : ticket))
      );
    },
    onError: (_error, _newTicket, context) => {
      if (!context) return;
      queryClient.setQueryData<Ticket[]>(["ticket"], context.previousTickets);
    },
  });
};

export default useCreateTicket;
