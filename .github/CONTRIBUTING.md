<!-- omit in toc -->
# Contribuer au Sith 4

Premièrement, merci de prendre le temps de contribuer ! ❤️

Tout type de contributions sont encouragée et valorisée. Veuillez consulter la [Table des matières](#table-des-matières) pour différentes façons de contribuer et les détails sur la façon dont ce projet les traite. Assurez-vous de lire la section appropriée avant de faire votre contribution. Cela rendra la tâche beaucoup plus facile pour nous les mainteneurs et l'expérience pour tous ceux concernés. La communauté attend vos contributions. 🎉

> Et si vous aimez le projet, mais que vous n'avez pas le temps de contribuer, ce n'est pas grave. Il y a d'autres façons de soutenir le projet et de montrer votre appréciation, dont nous serions également très heureux :
>
> - Mettre une étoile au projet
> - Tweeter à ce sujet
> - Référencer ce projet dans le README de votre projet
> - Mentioner le projet lors de réunion locales et parler-en à vos amis/collègues

<!-- omit in toc -->
## Table des matières

- [Code de conduite](#code-de-conduite)
- [J'ai une question](#jai-une-question)
- [Je veux contribuer](#je-veux-contribuer)
- [Rapporter des Bugs](#rapporter-des-bugs)
- [Suggérer des améliorations](#suggérer-des-améliorations)
- [Votre première contribution de code](#votre-première-contribution-de-code)
- [Améliorer la documentation](#améliorer-la-documentation)
- [Guide de style](#guide-de-style)
- [Messages de commit](#messages-de-commit)
- [Contactez nous](#contactez-nous)

## Code de conduite

Ce projet et tous ses participants sont régis par le [Code de conduite du Sith 4](https://github.com/ae-utbm/sith4/blob/main/.github/CODE_OF_CONDUCT.md). En participant, vous vous engagez à respecter ce code de conduite. Veuillez rapporter tout comportement inacceptable à [ae.info@utbm.fr](ae.info@utbm.fr) ou via GitHub.

## J'ai une question

> Si vous voulez poser une question, nous estimons que vous avez lu la [documentation](https://github.com/ae-utbm/api/wiki).

Avant que vous posiez une question, il est préférable de rechercher dans les issues existantes si elle n'y est pas déjà posée. Dans le cas ou une issue existerait déjà et que vous auriez toujours besoin d'une clarification, vous pouvez écrire votre question dans cette issue. Il est également conseillé de rechercher sur internet pour y trouver une réponse en premier lieu.

Si vous ressentez toujours le besoin de poser votre question, nous vous recommandons les étapes suivantes :

- Ouvrez une [issue](https://github.com/ae-utbm/sith4/issues/new).
- Donnez autant de contexte que possible sur ce que vous rencontrez.
- Donnez les versions de vos projets et plateformes (nodejs, npm, etc), selon ce qui semble pertinent.

Nous nous occuperons alors du problème dans les plus brefs délais.

## Je veux contribuer

### Rapporter des Bugs

<!-- omit in toc -->
#### Avant de rapporter un bug

Une bonne issue ne doit pas laisser les autres vous courir après afin d'obtenir davantage d'information. Ainsi, nous vous demandons d'enquêter attentivement, de collecter des informations et décrire le problème en détail dans votre rapport. Veuillez compléter les étapes suivantes à l'avance pour nous aider à résoudre le bug potentiel le plus rapidement possible.

- Assurez-vous d'utiliser la dernière version.
- Vérifiez si votre bug n'est pas en fait une erreur de votre côté, par exemple en utilisant des composants d'environnement/incompatibles (assurez-vous d'avoir lu la [documentation](https://github.com/ae-utbm/api/wiki).
Si vous recherchez de l'aide, vous pouvez consulter [cette section](#jai-une-question)).
- Pour voir si d'autres utilisateurs ont expérimentés (et potentiellement déjà résolu) le même problème que vous rencontrez, vérifiez si il n'y a pas déjà un rapport de bug existant pour votre bug ou erreur dans le [bug tracker](https://github.com/ae-utbm/sith4/issues?q=is%3Aissue+is%3Aclosed)
- Assurez-vous de rechercher sur internet (y compris Stack Overflow) pour voir si d'autres utilisateurs hors de la communauté GitHub ont discuté du problème.
- Collectez des informations sur le bug :
  - La stack trace
  - l'OS, la plateforme et la version (Windows, Linux, MacOS, x86...)
  - La version de votre interpréteur, compilateur, SDK, environnement d'exécution, gestionnaire de paquets, selon ce qui semble pertinent.
  - Votre entrée et votre sortie
  - Pouvez-vous reproduire le problème de manière fiable ? Et pouvez-vous également le reproduire avec des anciennes versions ?

#### Comment rapporter un bug ?

> Vous ne devez jamais rapporter des problèmes de sécurité, de vulnérabilités ou comprenant des informations sensibles dans le bug tracker, ou ailleurs publiquement. Au lieu de cela, ces bugs sensibles doivent être envoyés par e-mail à [ae.info@utbm.fr](ae.info@utbm.fr)

Nous utilisons les issues GitHub pour suivre les bugs et les erreurs. Si vous rencontrez un problème avec le projet :

- Ouvrez une [issue](https://github.com/ae-utbm/sith4/issues/new). (Comme nous ne pouvons pas être sûrs à ce stade de savoir si c'est un bug ou non, nous vous demandons de ne pas parler de bug et de ne pas ajouter de tag sur l'issue.)
- Expliquer le comportement que vous attendez et le comportement réel.
- Veuillez fournir autant de contexte que possible et décrire les *étapes de reproduction* que quelqu'un d'autre peut suivre pour recréer le problème sur son propre ordinateur. Cela inclut généralement votre code. Pour de bons rapports de bugs, vous devez isoler le problème et créer un cas de test réduit.
- Si vous en avez la possibilité, incluez des captures d'écran et des vidéos qui montrent le problème.

Une fois que c'est fait :

- L'équipe en charge du projet ajoutera les tags correspondant.
- Un membre de l'équipe tentera de reproduire l'issue avec les étapes que vous avez fournis. Si il n'y a pas d'étapes de reproduction ou aucune façon évidente de reproduire le problème, l'équipe vous demandera de fournir ces étapes et marquera l'issue comme `info-needed`. Les bugs avec le tag `info-needed` ne seront pas traités jusqu'à ce qu'ils soient reproduits.
- Si l'équipe est en mesure de reproduire le problème, il sera marqué `approved`, ainsi que potentiellement d'autres tags (comme `critical`), et l'issue sera laissée à être [implémentée par quelqu'un](#votre-première-contribution-de-code).

### Suggérer des améliorations

Cette section vous guide

Cette section vous guide tout au long de la soumission d'une suggestion d'amélioration pour le Sith 4, **incluant des fonctionnalités entièrement nouvelles et des améliorations mineures des fonctionnalités existantes**. Suivre ces directives aidera les mainteneurs et la communauté à comprendre votre suggestion et à trouver des suggestions connexes.

<!-- omit in toc -->
#### Avant de soumettre une amélioration

- Assurez-vous que vous utilisez la dernière version.
- Lisez attentivement la [documentation](https://github.com/ae-utbm/sith4/wiki) et découvrez si la fonctionnalité est déjà couverte, peut-être par une configuration individuelle.

- Effectuez une [recherche](https://github.com/ae-utbm/sith4/issues) pour voir si l'amélioration a déjà été suggérée. Si c'est le cas, ajoutez un commentaire au problème existant au lieu d'en ouvrir un nouveau.
- Découvrez si votre idée correspond à la portée et aux objectifs du projet. A vous de monter un dossier solide pour convaincre les développeurs du projet du bien-fondé de cette fonctionnalité. Gardez à l'esprit que nous voulons des fonctionnalités qui seront utiles à la majorité de nos utilisateurs et pas seulement à un petit sous-ensemble.

#### Comment soumettre une bonne suggestion d'amélioration ?

Les suggestions d'amélioration sont suivies comme des [issues](https://github.com/ae-utbm/sith4/issues).

- Utilisez un **titre clair et descriptif** pour le problème afin d'identifier la suggestion.
- Fournissez une **description étape par étape de l'amélioration suggérée** avec autant de détails que possible.
- **Décrivez le comportement actuel** et **expliquez quel comportement vous attendiez à la place** et pourquoi. À ce stade, vous pouvez également indiquer les alternatives qui ne fonctionnent pas pour vous.
- Vous voudrez peut-être **inclure des captures d'écran et des GIF animés** qui vous aideront à démontrer les étapes ou à indiquer la partie à laquelle la suggestion est liée. Vous pouvez utiliser [cet outil](https://www.cockos.com/licecap/) pour enregistrer des GIF sur macOS et Windows, et [cet outil](https://github.com/colinkeenan/silentcast) ou [cet outil](https://github.com/GNOME/byzanz) sous Linux.
- **Expliquez pourquoi cette amélioration serait utile** à la plupart des utilisateurs du Sith 4. Vous pouvez également signaler les autres projets qui l'ont mieux résolu et qui pourraient servir d'inspiration.

### Votre première contribution de code

Afin d'installer le projet sur votre machine, veuillez-vous référer à la [documentation](https://github.com/ae-utbm/sith4/wiki) ainsi qu'au fichier [README](https://github.com/ae-utbm/sith4/blob/main/README.md)

### Améliorer la documentation

Libre à vous d'améliorer la documentation en clonant le repository du wiki : `git clone https://github.com/ae-utbm/sith4.wiki.git` et de faire une pull request.

## Guide de style

### Messages de commit

- Utilisez le présent simple ("Add function" au lieu de "Add a functionality")
- Utilisez le corps du message pour expliquer les changements et les raisons, pas le titre.
- Les messages de commit doivent être écrits en anglais, en général c'est plus cours qu'en français.

## Contactez nous

Rejoignez-nous sur Discord <https://discord.gg/XK9WfPsUFm> !
