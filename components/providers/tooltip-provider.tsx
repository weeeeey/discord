import {
    Tooltip,
    TooltipContent,
    TooltipProvider as TP,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const TooltipProvider = ({
    children,
    description,
}: {
    children: React.ReactNode;
    description?: string;
}) => {
    return (
        <TP>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent>
                    <p>{description}</p>
                </TooltipContent>
            </Tooltip>
        </TP>
    );
};

export default TooltipProvider;
