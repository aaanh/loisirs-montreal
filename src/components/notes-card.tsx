import { Link2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NotesCard() {
  const { t } = useTranslation();

  return (
    <div className="flex items-start gap-3 border border-border border-l-2 border-l-primary/50 bg-background px-4 py-3">
      <Link2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
        <span className="text-foreground">{t("notesCard.prefix")}</span>{" "}
        {t("notesCard.body")}
      </p>
    </div>
  );
}
