"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/buttons/button"
import { useWorkbenchStore } from "@/lib/workbench-store"
import { AnimationRuntime } from "@/lib/animation-runtime"
import * as LucideIcons from "lucide-react"
import * as FaIcons from "react-icons/fa"
import * as HiIcons from "react-icons/hi2"
import * as FiIcons from "react-icons/fi"
import * as AiIcons from "react-icons/ai"
import * as BsIcons from "react-icons/bs"
import * as IoIcons from "react-icons/io5"
import * as MdIcons from "react-icons/md"

interface ButtonWorkbenchProps {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "success" | "warning"
    size?: "xs" | "sm" | "md" | "lg" | "xl"
    isLoading?: boolean
    fullWidth?: boolean
    disabled?: boolean
    className?: string
    children?: React.ReactNode
    hasIcon?: boolean
    iconPosition?: "left" | "right"
    iconPack?: "lucide" | "fontawesome" | "heroicons" | "feather" | "antdesign" | "bootstrap" | "ionicons" | "material"
    iconName?: string
    [key: string]: any // Allow additional props
}

// Available icons organized by pack
const ICON_PACKS = {
    lucide: {
        // Common icons
        Search: LucideIcons.Search,
        Menu: LucideIcons.Menu,
        X: LucideIcons.X,
        ChevronLeft: LucideIcons.ChevronLeft,
        ChevronRight: LucideIcons.ChevronRight,
        ChevronDown: LucideIcons.ChevronDown,
        ChevronUp: LucideIcons.ChevronUp,
        
        // Actions
        Plus: LucideIcons.Plus,
        Minus: LucideIcons.Minus,
        Check: LucideIcons.Check,
        Copy: LucideIcons.Copy,
        Trash: LucideIcons.Trash,
        Edit: LucideIcons.Edit,
        Download: LucideIcons.Download,
        Upload: LucideIcons.Upload,
        Share: LucideIcons.Share,
        Save: LucideIcons.Save,
        
        // UI Elements
        Eye: LucideIcons.Eye,
        EyeOff: LucideIcons.EyeOff,
        Lock: LucideIcons.Lock,
        Unlock: LucideIcons.Unlock,
        Settings: LucideIcons.Settings,
        Filter: LucideIcons.Filter,
        MoreVertical: LucideIcons.MoreVertical,
        MoreHorizontal: LucideIcons.MoreHorizontal,
        
        // Social & Communication
        Heart: LucideIcons.Heart,
        Star: LucideIcons.Star,
        Bell: LucideIcons.Bell,
        Mail: LucideIcons.Mail,
        MessageSquare: LucideIcons.MessageSquare,
        Send: LucideIcons.Send,
        
        // User & People
        User: LucideIcons.User,
        Users: LucideIcons.Users,
        UserPlus: LucideIcons.UserPlus,
        UserMinus: LucideIcons.UserMinus,
        
        // Navigation
        Home: LucideIcons.Home,
        ArrowLeft: LucideIcons.ArrowLeft,
        ArrowRight: LucideIcons.ArrowRight,
        ArrowUp: LucideIcons.ArrowUp,
        ArrowDown: LucideIcons.ArrowDown,
        ExternalLink: LucideIcons.ExternalLink,
        
        // Files & Folders
        Folder: LucideIcons.Folder,
        FolderOpen: LucideIcons.FolderOpen,
        File: LucideIcons.File,
        FileText: LucideIcons.FileText,
        Image: LucideIcons.Image,
        
        // Time & Calendar
        Calendar: LucideIcons.Calendar,
        Clock: LucideIcons.Clock,
        
        // Media
        Play: LucideIcons.Play,
        Pause: LucideIcons.Pause,
        Volume2: LucideIcons.Volume2,
        VolumeX: LucideIcons.VolumeX,
        
        // Status
        AlertCircle: LucideIcons.AlertCircle,
        AlertTriangle: LucideIcons.AlertTriangle,
        Info: LucideIcons.Info,
        CheckCircle: LucideIcons.CheckCircle,
        XCircle: LucideIcons.XCircle,
        
        // Shopping
        ShoppingCart: LucideIcons.ShoppingCart,
        ShoppingBag: LucideIcons.ShoppingBag,
        CreditCard: LucideIcons.CreditCard,
        
        // Misc
        Sun: LucideIcons.Sun,
        Moon: LucideIcons.Moon,
        Zap: LucideIcons.Zap,
        Wifi: LucideIcons.Wifi,
        WifiOff: LucideIcons.WifiOff,
        Loader: LucideIcons.Loader,
        RefreshCw: LucideIcons.RefreshCw,
    },
    
    fontawesome: {
        // Common icons
        Search: FaIcons.FaSearch,
        Menu: FaIcons.FaBars,
        X: FaIcons.FaTimes,
        ChevronLeft: FaIcons.FaChevronLeft,
        ChevronRight: FaIcons.FaChevronRight,
        ChevronDown: FaIcons.FaChevronDown,
        ChevronUp: FaIcons.FaChevronUp,
        
        // Actions
        Plus: FaIcons.FaPlus,
        Minus: FaIcons.FaMinus,
        Check: FaIcons.FaCheck,
        Copy: FaIcons.FaCopy,
        Trash: FaIcons.FaTrash,
        Edit: FaIcons.FaEdit,
        Download: FaIcons.FaDownload,
        Upload: FaIcons.FaUpload,
        Share: FaIcons.FaShareAlt,
        Save: FaIcons.FaSave,
        
        // UI Elements
        Eye: FaIcons.FaEye,
        EyeOff: FaIcons.FaEyeSlash,
        Lock: FaIcons.FaLock,
        Unlock: FaIcons.FaUnlock,
        Settings: FaIcons.FaCog,
        Filter: FaIcons.FaFilter,
        MoreVertical: FaIcons.FaEllipsisV,
        MoreHorizontal: FaIcons.FaEllipsisH,
        
        // Social & Communication
        Heart: FaIcons.FaHeart,
        Star: FaIcons.FaStar,
        Bell: FaIcons.FaBell,
        Mail: FaIcons.FaEnvelope,
        MessageSquare: FaIcons.FaComment,
        Send: FaIcons.FaPaperPlane,
        
        // User & People
        User: FaIcons.FaUser,
        Users: FaIcons.FaUsers,
        UserPlus: FaIcons.FaUserPlus,
        UserMinus: FaIcons.FaUserMinus,
        
        // Navigation
        Home: FaIcons.FaHome,
        ArrowLeft: FaIcons.FaArrowLeft,
        ArrowRight: FaIcons.FaArrowRight,
        ArrowUp: FaIcons.FaArrowUp,
        ArrowDown: FaIcons.FaArrowDown,
        ExternalLink: FaIcons.FaExternalLinkAlt,
        
        // Files & Folders
        Folder: FaIcons.FaFolder,
        FolderOpen: FaIcons.FaFolderOpen,
        File: FaIcons.FaFile,
        FileText: FaIcons.FaFileAlt,
        Image: FaIcons.FaImage,
        
        // Time & Calendar
        Calendar: FaIcons.FaCalendar,
        Clock: FaIcons.FaClock,
        
        // Media
        Play: FaIcons.FaPlay,
        Pause: FaIcons.FaPause,
        Volume2: FaIcons.FaVolumeUp,
        VolumeX: FaIcons.FaVolumeMute,
        
        // Status
        AlertCircle: FaIcons.FaExclamationCircle,
        AlertTriangle: FaIcons.FaExclamationTriangle,
        Info: FaIcons.FaInfoCircle,
        CheckCircle: FaIcons.FaCheckCircle,
        XCircle: FaIcons.FaTimesCircle,
        
        // Shopping
        ShoppingCart: FaIcons.FaShoppingCart,
        ShoppingBag: FaIcons.FaShoppingBag,
        CreditCard: FaIcons.FaCreditCard,
        
        // Misc
        Sun: FaIcons.FaSun,
        Moon: FaIcons.FaMoon,
        Zap: FaIcons.FaBolt,
        Wifi: FaIcons.FaWifi,
        Loader: FaIcons.FaSpinner,
        RefreshCw: FaIcons.FaSyncAlt,
    },
    
    heroicons: {
        // Common icons
        Search: HiIcons.HiMagnifyingGlass,
        Menu: HiIcons.HiBars3,
        X: HiIcons.HiXMark,
        ChevronLeft: HiIcons.HiChevronLeft,
        ChevronRight: HiIcons.HiChevronRight,
        ChevronDown: HiIcons.HiChevronDown,
        ChevronUp: HiIcons.HiChevronUp,
        
        // Actions
        Plus: HiIcons.HiPlus,
        Minus: HiIcons.HiMinus,
        Check: HiIcons.HiCheck,
        Copy: HiIcons.HiDocumentDuplicate,
        Trash: HiIcons.HiTrash,
        Edit: HiIcons.HiPencil,
        Download: HiIcons.HiArrowDownTray,
        Upload: HiIcons.HiArrowUpTray,
        Share: HiIcons.HiShare,
        Save: HiIcons.HiDocumentArrowDown,
        
        // UI Elements
        Eye: HiIcons.HiEye,
        EyeOff: HiIcons.HiEyeSlash,
        Lock: HiIcons.HiLockClosed,
        Unlock: HiIcons.HiLockOpen,
        Settings: HiIcons.HiCog6Tooth,
        Filter: HiIcons.HiFunnel,
        MoreVertical: HiIcons.HiEllipsisVertical,
        MoreHorizontal: HiIcons.HiEllipsisHorizontal,
        
        // Social & Communication
        Heart: HiIcons.HiHeart,
        Star: HiIcons.HiStar,
        Bell: HiIcons.HiBell,
        Mail: HiIcons.HiEnvelope,
        MessageSquare: HiIcons.HiChatBubbleLeftRight,
        Send: HiIcons.HiPaperAirplane,
        
        // User & People
        User: HiIcons.HiUser,
        Users: HiIcons.HiUsers,
        UserPlus: HiIcons.HiUserPlus,
        UserMinus: HiIcons.HiUserMinus,
        
        // Navigation
        Home: HiIcons.HiHome,
        ArrowLeft: HiIcons.HiArrowLeft,
        ArrowRight: HiIcons.HiArrowRight,
        ArrowUp: HiIcons.HiArrowUp,
        ArrowDown: HiIcons.HiArrowDown,
        ExternalLink: HiIcons.HiArrowTopRightOnSquare,
        
        // Files & Folders
        Folder: HiIcons.HiFolder,
        FolderOpen: HiIcons.HiFolderOpen,
        File: HiIcons.HiDocument,
        FileText: HiIcons.HiDocumentText,
        Image: HiIcons.HiPhoto,
        
        // Time & Calendar
        Calendar: HiIcons.HiCalendar,
        Clock: HiIcons.HiClock,
        
        // Media
        Play: HiIcons.HiPlay,
        Pause: HiIcons.HiPause,
        Volume2: HiIcons.HiSpeakerWave,
        VolumeX: HiIcons.HiSpeakerXMark,
        
        // Status
        AlertCircle: HiIcons.HiExclamationCircle,
        AlertTriangle: HiIcons.HiExclamationTriangle,
        Info: HiIcons.HiInformationCircle,
        CheckCircle: HiIcons.HiCheckCircle,
        XCircle: HiIcons.HiXCircle,
        
        // Shopping
        ShoppingCart: HiIcons.HiShoppingCart,
        ShoppingBag: HiIcons.HiShoppingBag,
        CreditCard: HiIcons.HiCreditCard,
        
        // Misc
        Sun: HiIcons.HiSun,
        Moon: HiIcons.HiMoon,
        Zap: HiIcons.HiBolt,
        Wifi: HiIcons.HiWifi,
        Loader: HiIcons.HiArrowPath,
        RefreshCw: HiIcons.HiArrowPath,
    },
    
    feather: {
        // Common icons
        Search: FiIcons.FiSearch,
        Menu: FiIcons.FiMenu,
        X: FiIcons.FiX,
        ChevronLeft: FiIcons.FiChevronLeft,
        ChevronRight: FiIcons.FiChevronRight,
        ChevronDown: FiIcons.FiChevronDown,
        ChevronUp: FiIcons.FiChevronUp,
        
        // Actions
        Plus: FiIcons.FiPlus,
        Minus: FiIcons.FiMinus,
        Check: FiIcons.FiCheck,
        Copy: FiIcons.FiCopy,
        Trash: FiIcons.FiTrash,
        Edit: FiIcons.FiEdit,
        Download: FiIcons.FiDownload,
        Upload: FiIcons.FiUpload,
        Share: FiIcons.FiShare2,
        Save: FiIcons.FiSave,
        
        // UI Elements
        Eye: FiIcons.FiEye,
        EyeOff: FiIcons.FiEyeOff,
        Lock: FiIcons.FiLock,
        Unlock: FiIcons.FiUnlock,
        Settings: FiIcons.FiSettings,
        Filter: FiIcons.FiFilter,
        MoreVertical: FiIcons.FiMoreVertical,
        MoreHorizontal: FiIcons.FiMoreHorizontal,
        
        // Social & Communication
        Heart: FiIcons.FiHeart,
        Star: FiIcons.FiStar,
        Bell: FiIcons.FiBell,
        Mail: FiIcons.FiMail,
        MessageSquare: FiIcons.FiMessageSquare,
        Send: FiIcons.FiSend,
        
        // User & People
        User: FiIcons.FiUser,
        Users: FiIcons.FiUsers,
        UserPlus: FiIcons.FiUserPlus,
        UserMinus: FiIcons.FiUserMinus,
        
        // Navigation
        Home: FiIcons.FiHome,
        ArrowLeft: FiIcons.FiArrowLeft,
        ArrowRight: FiIcons.FiArrowRight,
        ArrowUp: FiIcons.FiArrowUp,
        ArrowDown: FiIcons.FiArrowDown,
        ExternalLink: FiIcons.FiExternalLink,
        
        // Files & Folders
        Folder: FiIcons.FiFolder,
        File: FiIcons.FiFile,
        FileText: FiIcons.FiFileText,
        Image: FiIcons.FiImage,
        
        // Time & Calendar
        Calendar: FiIcons.FiCalendar,
        Clock: FiIcons.FiClock,
        
        // Media
        Play: FiIcons.FiPlay,
        Pause: FiIcons.FiPause,
        Volume2: FiIcons.FiVolume2,
        VolumeX: FiIcons.FiVolumeX,
        
        // Status
        AlertCircle: FiIcons.FiAlertCircle,
        AlertTriangle: FiIcons.FiAlertTriangle,
        Info: FiIcons.FiInfo,
        CheckCircle: FiIcons.FiCheckCircle,
        XCircle: FiIcons.FiXCircle,
        
        // Shopping
        ShoppingCart: FiIcons.FiShoppingCart,
        ShoppingBag: FiIcons.FiShoppingBag,
        CreditCard: FiIcons.FiCreditCard,
        
        // Misc
        Sun: FiIcons.FiSun,
        Moon: FiIcons.FiMoon,
        Zap: FiIcons.FiZap,
        Wifi: FiIcons.FiWifi,
        WifiOff: FiIcons.FiWifiOff,
        Loader: FiIcons.FiLoader,
        RefreshCw: FiIcons.FiRefreshCw,
    },

    antdesign: {
        // Common icons
        Search: AiIcons.AiOutlineSearch,
        Menu: AiIcons.AiOutlineMenu,
        X: AiIcons.AiOutlineClose,
        ChevronLeft: AiIcons.AiOutlineLeft,
        ChevronRight: AiIcons.AiOutlineRight,
        ChevronDown: AiIcons.AiOutlineDown,
        ChevronUp: AiIcons.AiOutlineUp,
        
        // Actions
        Plus: AiIcons.AiOutlinePlus,
        Minus: AiIcons.AiOutlineMinus,
        Check: AiIcons.AiOutlineCheck,
        Copy: AiIcons.AiOutlineCopy,
        Trash: AiIcons.AiOutlineDelete,
        Edit: AiIcons.AiOutlineEdit,
        Download: AiIcons.AiOutlineDownload,
        Upload: AiIcons.AiOutlineUpload,
        Share: AiIcons.AiOutlineShareAlt,
        Save: AiIcons.AiOutlineSave,
        
        // UI Elements
        Eye: AiIcons.AiOutlineEye,
        EyeOff: AiIcons.AiOutlineEyeInvisible,
        Lock: AiIcons.AiOutlineLock,
        Unlock: AiIcons.AiOutlineUnlock,
        Settings: AiIcons.AiOutlineSetting,
        Filter: AiIcons.AiOutlineFilter,
        MoreVertical: AiIcons.AiOutlineMore,
        
        // Social & Communication
        Heart: AiIcons.AiOutlineHeart,
        Star: AiIcons.AiOutlineStar,
        Bell: AiIcons.AiOutlineBell,
        Mail: AiIcons.AiOutlineMail,
        MessageSquare: AiIcons.AiOutlineMessage,
        Send: AiIcons.AiOutlineSend,
        
        // User & People
        User: AiIcons.AiOutlineUser,
        Users: AiIcons.AiOutlineTeam,
        UserPlus: AiIcons.AiOutlineUserAdd,
        UserMinus: AiIcons.AiOutlineUserDelete,
        
        // Navigation
        Home: AiIcons.AiOutlineHome,
        ArrowLeft: AiIcons.AiOutlineArrowLeft,
        ArrowRight: AiIcons.AiOutlineArrowRight,
        ArrowUp: AiIcons.AiOutlineArrowUp,
        ArrowDown: AiIcons.AiOutlineArrowDown,
        
        // Files & Folders
        Folder: AiIcons.AiOutlineFolder,
        FolderOpen: AiIcons.AiOutlineFolderOpen,
        File: AiIcons.AiOutlineFile,
        FileText: AiIcons.AiOutlineFileText,
        Image: AiIcons.AiOutlineFileImage,
        
        // Time & Calendar
        Calendar: AiIcons.AiOutlineCalendar,
        Clock: AiIcons.AiOutlineClockCircle,
        
        // Status
        AlertCircle: AiIcons.AiOutlineExclamationCircle,
        AlertTriangle: AiIcons.AiOutlineWarning,
        Info: AiIcons.AiOutlineInfoCircle,
        CheckCircle: AiIcons.AiOutlineCheckCircle,
        XCircle: AiIcons.AiOutlineCloseCircle,
        
        // Shopping
        ShoppingCart: AiIcons.AiOutlineShoppingCart,
        CreditCard: AiIcons.AiOutlineCreditCard,
        
        // Misc
        Loader: AiIcons.AiOutlineLoading3Quarters,
    },

    bootstrap: {
        // Common icons
        Search: BsIcons.BsSearch,
        Menu: BsIcons.BsList,
        X: BsIcons.BsX,
        ChevronLeft: BsIcons.BsChevronLeft,
        ChevronRight: BsIcons.BsChevronRight,
        ChevronDown: BsIcons.BsChevronDown,
        ChevronUp: BsIcons.BsChevronUp,
        
        // Actions
        Plus: BsIcons.BsPlus,
        Minus: BsIcons.BsDash,
        Check: BsIcons.BsCheck,
        Copy: BsIcons.BsClipboard,
        Trash: BsIcons.BsTrash,
        Edit: BsIcons.BsPencil,
        Download: BsIcons.BsDownload,
        Upload: BsIcons.BsUpload,
        Share: BsIcons.BsShare,
        Save: BsIcons.BsSave,
        
        // UI Elements
        Eye: BsIcons.BsEye,
        EyeOff: BsIcons.BsEyeSlash,
        Lock: BsIcons.BsLock,
        Unlock: BsIcons.BsUnlock,
        Settings: BsIcons.BsGear,
        Filter: BsIcons.BsFilter,
        MoreVertical: BsIcons.BsThreeDotsVertical,
        MoreHorizontal: BsIcons.BsThreeDots,
        
        // Social & Communication
        Heart: BsIcons.BsHeart,
        Star: BsIcons.BsStar,
        Bell: BsIcons.BsBell,
        Mail: BsIcons.BsEnvelope,
        MessageSquare: BsIcons.BsChat,
        Send: BsIcons.BsSend,
        
        // User & People
        User: BsIcons.BsPerson,
        Users: BsIcons.BsPeople,
        UserPlus: BsIcons.BsPersonPlus,
        
        // Navigation
        Home: BsIcons.BsHouse,
        ArrowLeft: BsIcons.BsArrowLeft,
        ArrowRight: BsIcons.BsArrowRight,
        ArrowUp: BsIcons.BsArrowUp,
        ArrowDown: BsIcons.BsArrowDown,
        
        // Files & Folders
        Folder: BsIcons.BsFolder,
        File: BsIcons.BsFileEarmark,
        FileText: BsIcons.BsFileText,
        Image: BsIcons.BsImage,
        
        // Time & Calendar
        Calendar: BsIcons.BsCalendar,
        Clock: BsIcons.BsClock,
        
        // Media
        Play: BsIcons.BsPlay,
        Pause: BsIcons.BsPause,
        
        // Status
        AlertCircle: BsIcons.BsExclamationCircle,
        AlertTriangle: BsIcons.BsExclamationTriangle,
        Info: BsIcons.BsInfoCircle,
        CheckCircle: BsIcons.BsCheckCircle,
        XCircle: BsIcons.BsXCircle,
        
        // Shopping
        ShoppingCart: BsIcons.BsCart,
        CreditCard: BsIcons.BsCreditCard,
        
        // Misc
        Sun: BsIcons.BsSun,
        Moon: BsIcons.BsMoon,
        Zap: BsIcons.BsLightning,
        Wifi: BsIcons.BsWifi,
    },

    ionicons: {
        // Common icons
        Search: IoIcons.IoSearchOutline,
        Menu: IoIcons.IoMenuOutline,
        X: IoIcons.IoCloseOutline,
        ChevronLeft: IoIcons.IoChevronBackOutline,
        ChevronRight: IoIcons.IoChevronForwardOutline,
        ChevronDown: IoIcons.IoChevronDownOutline,
        ChevronUp: IoIcons.IoChevronUpOutline,
        
        // Actions
        Plus: IoIcons.IoAddOutline,
        Minus: IoIcons.IoRemoveOutline,
        Check: IoIcons.IoCheckmarkOutline,
        Copy: IoIcons.IoCopyOutline,
        Trash: IoIcons.IoTrashOutline,
        Edit: IoIcons.IoCreateOutline,
        Download: IoIcons.IoDownloadOutline,
        Upload: IoIcons.IoCloudUploadOutline,
        Share: IoIcons.IoShareSocialOutline,
        Save: IoIcons.IoSaveOutline,
        
        // UI Elements
        Eye: IoIcons.IoEyeOutline,
        EyeOff: IoIcons.IoEyeOffOutline,
        Lock: IoIcons.IoLockClosedOutline,
        Unlock: IoIcons.IoLockOpenOutline,
        Settings: IoIcons.IoSettingsOutline,
        Filter: IoIcons.IoFunnelOutline,
        MoreVertical: IoIcons.IoEllipsisVerticalOutline,
        MoreHorizontal: IoIcons.IoEllipsisHorizontalOutline,
        
        // Social & Communication
        Heart: IoIcons.IoHeartOutline,
        Star: IoIcons.IoStarOutline,
        Bell: IoIcons.IoNotificationsOutline,
        Mail: IoIcons.IoMailOutline,
        MessageSquare: IoIcons.IoChatbubbleOutline,
        Send: IoIcons.IoSendOutline,
        
        // User & People
        User: IoIcons.IoPersonOutline,
        Users: IoIcons.IoPeopleOutline,
        UserPlus: IoIcons.IoPersonAddOutline,
        UserMinus: IoIcons.IoPersonRemoveOutline,
        
        // Navigation
        Home: IoIcons.IoHomeOutline,
        ArrowLeft: IoIcons.IoArrowBackOutline,
        ArrowRight: IoIcons.IoArrowForwardOutline,
        ArrowUp: IoIcons.IoArrowUpOutline,
        ArrowDown: IoIcons.IoArrowDownOutline,
        ExternalLink: IoIcons.IoOpenOutline,
        
        // Files & Folders
        Folder: IoIcons.IoFolderOutline,
        FolderOpen: IoIcons.IoFolderOpenOutline,
        File: IoIcons.IoDocumentOutline,
        FileText: IoIcons.IoDocumentTextOutline,
        Image: IoIcons.IoImageOutline,
        
        // Time & Calendar
        Calendar: IoIcons.IoCalendarOutline,
        Clock: IoIcons.IoTimeOutline,
        
        // Media
        Play: IoIcons.IoPlayOutline,
        Pause: IoIcons.IoPauseOutline,
        Volume2: IoIcons.IoVolumeHighOutline,
        VolumeX: IoIcons.IoVolumeMuteOutline,
        
        // Status
        AlertCircle: IoIcons.IoAlertCircleOutline,
        AlertTriangle: IoIcons.IoWarningOutline,
        Info: IoIcons.IoInformationCircleOutline,
        CheckCircle: IoIcons.IoCheckmarkCircleOutline,
        XCircle: IoIcons.IoCloseCircleOutline,
        
        // Shopping
        ShoppingCart: IoIcons.IoCartOutline,
        ShoppingBag: IoIcons.IoBagOutline,
        CreditCard: IoIcons.IoCardOutline,
        
        // Misc
        Sun: IoIcons.IoSunnyOutline,
        Moon: IoIcons.IoMoonOutline,
        Zap: IoIcons.IoFlashOutline,
        Wifi: IoIcons.IoWifiOutline,
        Loader: IoIcons.IoReloadOutline,
        RefreshCw: IoIcons.IoRefreshOutline,
    },

    material: {
        // Common icons
        Search: MdIcons.MdSearch,
        Menu: MdIcons.MdMenu,
        X: MdIcons.MdClose,
        ChevronLeft: MdIcons.MdChevronLeft,
        ChevronRight: MdIcons.MdChevronRight,
        
        // Actions
        Plus: MdIcons.MdAdd,
        Minus: MdIcons.MdRemove,
        Check: MdIcons.MdCheck,
        Copy: MdIcons.MdContentCopy,
        Trash: MdIcons.MdDelete,
        Edit: MdIcons.MdEdit,
        Download: MdIcons.MdDownload,
        Upload: MdIcons.MdUpload,
        Share: MdIcons.MdShare,
        Save: MdIcons.MdSave,
        
        // UI Elements
        Eye: MdIcons.MdVisibility,
        EyeOff: MdIcons.MdVisibilityOff,
        Lock: MdIcons.MdLock,
        Unlock: MdIcons.MdLockOpen,
        Settings: MdIcons.MdSettings,
        Filter: MdIcons.MdFilterList,
        MoreVertical: MdIcons.MdMoreVert,
        MoreHorizontal: MdIcons.MdMoreHoriz,
        
        // Social & Communication
        Heart: MdIcons.MdFavorite,
        Star: MdIcons.MdStar,
        Bell: MdIcons.MdNotifications,
        Mail: MdIcons.MdEmail,
        MessageSquare: MdIcons.MdMessage,
        Send: MdIcons.MdSend,
        
        // User & People
        User: MdIcons.MdPerson,
        Users: MdIcons.MdGroup,
        UserPlus: MdIcons.MdPersonAdd,
        
        // Navigation
        Home: MdIcons.MdHome,
        ArrowLeft: MdIcons.MdArrowBack,
        ArrowRight: MdIcons.MdArrowForward,
        ArrowUp: MdIcons.MdArrowUpward,
        ArrowDown: MdIcons.MdArrowDownward,
        
        // Files & Folders
        Folder: MdIcons.MdFolder,
        FolderOpen: MdIcons.MdFolderOpen,
        File: MdIcons.MdInsertDriveFile,
        Image: MdIcons.MdImage,
        
        // Time & Calendar
        Calendar: MdIcons.MdCalendarToday,
        Clock: MdIcons.MdSchedule,
        
        // Media
        Play: MdIcons.MdPlayArrow,
        Pause: MdIcons.MdPause,
        Volume2: MdIcons.MdVolumeUp,
        VolumeX: MdIcons.MdVolumeOff,
        
        // Status
        AlertCircle: MdIcons.MdError,
        AlertTriangle: MdIcons.MdWarning,
        Info: MdIcons.MdInfo,
        CheckCircle: MdIcons.MdCheckCircle,
        
        // Shopping
        ShoppingCart: MdIcons.MdShoppingCart,
        CreditCard: MdIcons.MdCreditCard,
        
        // Misc
        Sun: MdIcons.MdWbSunny,
        Moon: MdIcons.MdNightlight,
        Zap: MdIcons.MdFlashOn,
        Wifi: MdIcons.MdWifi,
        Loader: MdIcons.MdRefresh,
    },
}

export function ButtonWorkbench({ 
    variant = "primary", 
    size = "md", 
    isLoading = false, 
    fullWidth = false,
    disabled = false,
    className = "",
    children = "Button",
    hasIcon = false,
    iconPosition = "right",
    iconPack = "lucide",
    iconName = "none",
    ...props
}: ButtonWorkbenchProps) {
    
    // Get animation data from workbench store for icon animations
    const { animationPresets, currentScene } = useWorkbenchStore()
    
    // Get the current animation for this component
    const currentAnimation = currentScene?.animations.find(anim => anim.targetComponentId === 'root')
    
    // Debug logging to see what animation props we're receiving
    console.log('ButtonWorkbench received props:', { hasIcon, iconName, iconPack, ...props })
    console.log('ButtonWorkbench currentAnimation:', currentAnimation)
    
    const getIcon = () => {
        if (!hasIcon || iconName === "none") return null
        
        // Test with hardcoded FontAwesome icon
        if (iconPack === 'fontawesome' && iconName === 'Search') {
            return <FaIcons.FaSearch size={16} style={{ color: 'blue' }} />
        }
        
        // Test with hardcoded Lucide icon for comparison
        if (iconPack === 'lucide' && iconName === 'Search') {
            return <LucideIcons.Search size={16} style={{ color: 'green' }} />
        }
        
        // Get the icon from the selected pack
        const pack = ICON_PACKS[iconPack] || ICON_PACKS.lucide
        const IconComponent = pack[iconName as keyof typeof pack] as React.ComponentType<{size?: number, className?: string}>
        
        if (IconComponent) {
            return <IconComponent size={16} />
        }
        
        // Fallback icon if not found
        return (
            <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
            </svg>
        )
    }
    
    // Check if this is an icon-specific animation
    const isIconAnimation = hasIcon && iconName !== "none" && (
        iconPack === 'fontawesome' || iconPack === 'lucide' || iconPack === 'heroicons' || 
        iconPack === 'feather' || iconPack === 'antdesign' || iconPack === 'bootstrap' || 
        iconPack === 'ionicons' || iconPack === 'material'
    )
    
    const iconElement = getIcon()
    
    // Apply simple hover effect for icons
    if (isIconAnimation && iconElement) {
        return (
            <Button
                variant={variant}
                size={size}
                disabled={disabled}
                isLoading={isLoading}
                fullWidth={fullWidth}
                className={`${className} group`}
                {...props}
            >
                {iconPosition === "left" && (
                    <div 
                        className="inline-flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1" 
                        style={{ marginRight: '0.5rem' }}
                    >
                        {iconElement}
                    </div>
                )}
                
                {children}
                
                {iconPosition === "right" && (
                    <div 
                        className="inline-flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1" 
                        style={{ marginLeft: '0.5rem' }}
                    >
                        {iconElement}
                    </div>
                )}
            </Button>
        )
    }

    const icon = getIcon()
    
    return (
        <Button 
            variant={variant}
            size={size}
            isLoading={isLoading}
            fullWidth={fullWidth}
            leftIcon={iconPosition === "left" ? icon : null}
            rightIcon={iconPosition === "right" ? icon : null}
        >
            {children}
        </Button>
    )
}

// Export available icons for use in controls/dropdowns
export const getAvailableIcons = (pack: keyof typeof ICON_PACKS = "lucide") => {
    return Object.keys(ICON_PACKS[pack])
}

export const AVAILABLE_ICON_PACKS = Object.keys(ICON_PACKS) as Array<keyof typeof ICON_PACKS>