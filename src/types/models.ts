export interface FileWithPreview extends File {
    preview: string;
}

export interface DropzoneComponentProps {
    acceptedTypes: { [key: string]: string[] };
    message: string;
    fileInputRef?: React.RefObject<HTMLInputElement>;
    hideUploadButton?: boolean;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string
}

export interface DialogProps {
    isOpen: boolean;
    closeDialog: () => void;
}

export interface CreateCategoryDialogProps {
    isCreateCategoryOpen: boolean;
    closeCreateCategoryDialog: () => void;
}


export interface AddCategoryDialogProps {
    isAddCategoryOpen: boolean;
    closeAddCategoryDialog: () => void;
}


export interface EditProfileDialogProps {
    isEditProfileOpen: boolean;
    closeEditProfilePhotoDialog: () => void;
}


export interface SharePostDialogProps {
    isOpen: boolean;
    closeDialog: () => void;
    post: Post | null;
}

export interface ClearDataDialogProps {
    isClearDataDialogOpen: boolean;
    closeClearDataDialog: () => void;
}

export interface DeleteAccountDialogProps {
    isDeleteAccountDialogOpen: boolean;
    closeDeleteAccountDialog: () => void;
}

export interface ViewBackgroundPhotoDialogProps {
    isViewBackgroundPhotoOpen: boolean;
    closeViewBackgroundPhotoDialog: () => void;
    // post: Post | null;
}

export interface ViewProfilePhotoDialogProps {
    isViewProfilePhotoOpen: boolean;
    closeViewProfilePhotoDialog: () => void;
    // post: Post | null;
}

export interface Post {
    id: number;
    imageUrl: string;
    name: string;
    handle: string;
    href: string;
    date: string;
    title: string;
    description: string;
    embedImageUrl: string;
    embedAuthor: string;
    embedLink: string;
    platform: string;
    total_likes?: number;
    total_comments?: number;
    notes?: string;
    comments: Comment[];
}

export interface PostDialogProps {
    isOpen: boolean;
    closeDialog: () => void;
    post: Post | null;
    scrollToComments: boolean;
}

export interface DiscoverDialogProps {
    isOpen: boolean;
    closeDialog: () => void;
    post: Post | null;
}


export interface Reply {
    id: number;
    imageUrl: string;
    author: string;
    timestamp: string;
    content_text: string;
    likes: number;
}

export interface Comment {
    id: number;
    imageUrl: string;
    author: string;
    timestamp: string;
    content_text: string;
    likes: number;
    replies: Reply[];
}
  
  interface CommentSectionProps {
    comments: Comment[];
  }

export interface ReplyFormProps {
    onClose: () => void;
  }

export interface RepliesSectionProps {
    onClose: () => void;
    isOpen: boolean;
    comment: Comment;
}

export interface EmbedOrBookmarkProps {
    embedLink: string
    embedImageUrl: string
    embedAuthor: string
    platform: string
  }