import { useUser } from "@clerk/nextjs";
import { FiUser } from "react-icons/fi";

interface Collaborator {
  userId: string;
  joinedAt: Date;
}

interface CollaboratorsListProps {
  collaborators: Collaborator[];
}

export default function CollaboratorsList({
  collaborators,
}: CollaboratorsListProps) {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <FiUser className="text-primary" />
      <span className="text-sm font-medium">Collaborateurs actifs:</span>
      <div className="flex gap-2">
        {collaborators.map((collaborator) => (
          <div
            key={collaborator.userId}
            className="px-2 py-1 bg-primary/10 rounded-full text-xs"
          >
            {collaborator.userId === user?.id ? "Vous" : "Collaborateur"}
          </div>
        ))}
      </div>
    </div>
  );
}
