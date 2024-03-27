import { deleteUser } from "@lib/api";

import { useToast } from "@components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog";

interface DeleteUserProps {
  id: string;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onDelete: () => void;
}

export function DeleteUser({
  id,
  dialogOpen,
  setDialogOpen,
  onDelete,
}: DeleteUserProps) {
  const { toast } = useToast();

  function handleDeleteUser(id: string) {
    deleteUser(id).then(({ message }) => {
      onDelete();

      toast({ title: message });
    });
  }

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            user's account and their data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteUser(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
