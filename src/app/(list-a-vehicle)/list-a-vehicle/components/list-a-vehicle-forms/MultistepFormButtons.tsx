import { Button } from "@/components/ui/button";
interface MultistepFormButtonsProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onBackClick: () => void;
  onContinueClick: () => void;
  type?: "submit" | "button";
}

export default function MultistepFormButtons({
  currentStep = 1,
  totalSteps = 6,
  isSubmitting = false,
  onBackClick = () => {},
  onContinueClick = () => {},
  type = "submit",
}: MultistepFormButtonsProps) {
  return (
    <div className="grid w-max rounded-md justify-end ml-auto gap-5 grid-cols-2">
      <Button
        type="button"
        disabled={isSubmitting}
        onClick={onBackClick}
        className="border-0 bg-transparent text-black/80 shadow-none hover:bg-transparent hover:text-black/80 disabled:text-black/50 disabled:cursor-not-allowed">
        Back
      </Button>
      {currentStep === totalSteps && (
        <Button
          variant="cta"
          disabled={isSubmitting}
          type={type}
          onClick={onContinueClick}>
          {isSubmitting ? (
            <p className="flex items-center gap-2">
              <span>Submitting</span>
            </p>
          ) : (
            "Submit"
          )}
        </Button>
      )}
      {currentStep !== totalSteps && (
        <Button
          variant="cta"
          disabled={isSubmitting}
          type={type}
          onClick={onContinueClick}>
          {isSubmitting ? (
            <p className="flex items-center gap-2">
              <span>Submitting</span>
            </p>
          ) : (
            "Continue"
          )}
        </Button>
      )}
    </div>
  );
}
