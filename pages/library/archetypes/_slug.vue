<template>
  <div>
    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <!-- Species Details -->
    <v-row justify="center" no-gutters>
      <v-tabs centered grow color="red">
        <v-tab class="caption" key="tab-heritage" :href="`#tab-heritage`"
          ><h2 class="subtitle-2">Описание</h2></v-tab
        >

        <v-tab class="caption" key="tab-ancestry" :href="`#tab-ancestry`"
          ><h2 class="subtitle-2">Черты</h2></v-tab
        >

        <v-tab-item
          class="my-tab-item"
          key="tab-ancestry"
          :value="`tab-ancestry`"
        >
          <v-col :cols="12">
            <ColorfulEntry :headline="item.name" flavour="forge">
              <talents-preview
                :talents="talents"
                :level="20"
                :list="talents"
                :type="item.key"
                choose-mode
              />
            </ColorfulEntry>
          </v-col>
        </v-tab-item>

        <v-tab-item
          class="my-tab-item"
          key="tab-heritage"
          :value="`tab-heritage`"
        >
          <v-col :cols="12">
            <ColorfulEntry :headline="item.name" flavour="forge">
              <archetype-preview :item="item" :spells="spells" />
            </ColorfulEntry>
          </v-col>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </div>
</template>

<script>
import ColorfulEntry from "~/components/shared/ColorfulEntry";
import DodDefaultBreadcrumbs from "~/components/DodDefaultBreadcrumbs";
import ArchetypePreview from "~/components/forge/ArchetypePreviewV3";
import BreadcrumbSchemaMixin from "~/mixins/BreadcrumbSchemaMixin";
import WargearTraitRepository from "~/mixins/WargearTraitRepositoryMixin";
import TalentsPreview from "~/components/forge/TalentsPreviewV2.vue";

export default {
  name: "Archetype",
  components: {
    ArchetypePreview,
    ColorfulEntry,
    DodDefaultBreadcrumbs,
    TalentsPreview,
  },
  mixins: [BreadcrumbSchemaMixin, WargearTraitRepository],
  head() {
    const title = `${this.item.name}`;
    let isOfficial = ["core", "fspg", "red1", "cos"].includes(
      this.item.source.key
    );
    const description = ``;
    const image = `/img/avatars/archetype/${this.item.key}.png`;

    const robots = {
      hid: "robots",
      name: "robots",
      content: isOfficial ? "noindex,follow" : "index,follow",
    };

    return {
      titleTemplate: "%s | Библиотека",
      title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", name: "og:title", content: title },
        { hid: "og:description", name: "og:description", content: description },
        { hid: "og:image", name: "og:image", content: image },
        robots,
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          innerHTML: JSON.stringify(
            this.breadcrumbJsonLdSchema(this.breadcrumbItems)
          ),
          type: "application/ld+json",
        },
      ],
    };
  },
  async asyncData({ params, $axios, error }) {
    const { slug } = params;

    const response = await $axios.get(`/api/archetypes/${slug}`);
    const item = response.data;

    const { data } = await $axios.get("/api/abilityAncestry/");
    const psychic = await $axios.get("/api/psychic-powers/");

    const config = {
      params: {
        source: ["playerCore", "playerCore2"].join(","),
      },
    };
    const feat = await $axios.get("/api/talents/", config);
    const spells = psychic.data;
    const talents = feat.data.filter((s) => s);

    if (
      item === undefined ||
      item.length <= 0 ||
      data === undefined ||
      data.length <= 0
    ) {
      error({ statusCode: 404, message: "Archetype not found" });
    }

    if (data !== undefined) {
      const lowercaseKeywords = item.archetypeFeatures.map((s) =>
        s.toUpperCase()
      );

      //Список особенностей
      const List = data;
      let ability = List.filter((talent) =>
        lowercaseKeywords.includes(talent.key.toString().toUpperCase())
      );

      const abilityInArray = [];
      let SubFeature = [];
      let abilityList = [];

      //Сюда кладем то, что дается больше одного раза и смотрим под-опции
      ability.forEach((ab) => {
        if (Array.isArray(ab.level)) {
          abilityInArray.push(ab);
        }

        if (ab.options) {
          // if (ab.type.includes("Weapon Group")) {
          //   const options = this.weaponGroup.filter((s) =>
          //     ab.options.includes(s.group)
          //   );
          //   const listOption = [];
          //   options.forEach((s) => {
          //     const op = {
          //       key: s.group,
          //       ...s,
          //     };
          //     listOption.push(op);
          //     ab.options = listOption;
          //   });
          // }

          ab.options.forEach((s) => {
            if (s.subFeature) {
              const sub = s.subFeature;
              SubFeature = List.filter((s) => sub.includes(s.key));
              s.subFeature = SubFeature;
            }
          });

          if (ab.type === "Class Feature") {
            const options = List.filter((ability) =>
              ab.options.includes(ability.key)
            );

            ab.options = options;
          }

          //Наподобие подкласса Жреца
          ab.options.forEach((s) => {
            if (s.subFeature) {
              const sub = s.subFeature;
              SubFeature = List.filter((s) => sub.includes(s.key));
              s.subFeature = SubFeature;
            }
          });

          // if (ab.options.includes("deity"))
          // {
          //   ab.options = this.deityList;
          // }
        }
      });

      //Выкидываем из списка особенности, уровень которых перечислен в массиве
      ability = ability.filter((ab) => !Array.isArray(ab.level));

      // let ac = this.actionList;
      ability.forEach((tal) => {
        let action;
        // if (tal.item) action = ac.find((ac) => ac.key === tal.item.key);

        if (tal.skill) {
          if (tal.skill?.includes("all")) {
            tal.options = skill;
            tal.type = "Skill Choice";
          }
        }
        if (tal.weapon) {
          if (tal.weapon?.includes("all")) {
            tal.options = weapon;
            tal.type = "Weapon Choice";
          }
        }

        const ability1 = {
          name: tal.name,
          key: tal.key,
          description: tal.snippet,
          modification: tal.modification,
          level: tal.level,
          subFeature: tal.subFeature,
          options: tal.options,
          selected: tal.selected,
          action: action ? action : undefined,
          type: tal.type,
          value: tal.value,
        };
        abilityList.push(ability1);
      });
      //Смотрим все особенности, и делаем их по тем уровням, что в массиве
      abilityInArray.forEach((ab) => {
        const tal = ab;
        ab.level.forEach((talent) => {
          const ability1 = {
            name: tal.name,
            key: tal.key + talent,
            description: tal.snippet,
            modification: tal.modification,
            subFeature: tal.subFeature,
            level: talent,
            options: tal.options,
            selected: tal.selected,
            type: tal.type,
            value: tal.value,
          };

          //Кладем в общий "пул"
          abilityList.push(ability1);
        });
      });

      // abilityList = [
      //     ...abilityList, ...SubFeature
      //   ]

      if (ability.length > 0) {
        //Если нашли все особенности, то кладем их в каждый класс
        item.archetypeFeatures = abilityList;
      }
      item.archetypeFeatures = abilityList.sort((a, b) => a.level - b.level);
    }

    const traits1 = await $axios.get("/api/traits/");
    const traits = traits1.data;

    if (traits !== undefined) {
      talents
        .filter((s) => s.traits.includes(item.keywords))
        .forEach((species) => {
          if (species) {
            const tr = Array.isArray(species.traits)
              ? species.traits
              : String(species.traits).split(","); // если не массив — превращаем в массив

            const lowercaseKeywords = species.traits ? tr : "";

            species.traits = species.traits ? tr.map((s) => s.trim()) : "";
            species.trait = species.traits;
            const List1 = traits;
            const trait = List1.filter((talent) =>
              lowercaseKeywords.includes(talent.key.toString().toLowerCase())
            );

            if (trait.length > 0) {
              const listAbilities = [];
              species.traits.forEach((talent) => {
                const t = trait.find((k) => k.key.toLowerCase() === talent);

                if (t) {
                  const ability1 = {
                    name: t.key,
                    description: t.desc,
                  };

                  listAbilities.push(ability1);
                }
              });
              species.traitDesc = listAbilities;
            }
          }
        });
    }

    return {
      item,
      spells,
      talents: talents.filter((s) => s.traits.includes(item.keywords)),
      traits,
      slug,
      breadcrumbItems: [
        {
          text: "",
          nuxt: true,
          exact: true,
          to: "/",
        },
        {
          text: "Библиотека",
          nuxt: true,
          exact: true,
          to: "/library",
        },
        {
          text: "Классы",
          nuxt: true,
          exact: true,
          to: "/library/archetypes",
        },
        {
          text: item.name,
          disabled: true,
          nuxt: true,
          to: `/library/archetypes/${slug}`,
        },
      ],
    };
  },
};
</script>

<style scoped></style>
