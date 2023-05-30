<template>
  <div>
    <!-- Inset form here!  -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar flat color="amber-darken-1">
            <v-btn icon @click="goBack">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-toolbar-title class="ml-1">
              {{ isUpdate ? 'Update Club' : 'Create Club' }}
            </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <!-- <v-card height="300" width="245">
          <v-card-title>
            {{ form.Name ? form.Name : 'Club Name' }}
          </v-card-title>

          <v-card class="mt-3" ripple @click="upload" flat :loading="uploading">
            <v-img
              v-if="isUpdate && !uploadedImage"
              :src="`${api}/img/clubs/logos/${form.ClubCode}.png`"
              height="300px"
            ></v-img>
            <v-sheet
              v-else-if="!uploadedImage && !isUpdate"
              class="d-flex align-center"
              color="secondary lighten-3"
              height="300"
            >
              <div class="text-center mx-auto">
                <v-icon color="white" x-large>
                  mdi-camera
                </v-icon>
                <p class="body mt-2 white--text">
                  Upload Image
                </p>
              </div>
            </v-sheet>
            <v-img v-else :src="uploadedImage" height="300px"></v-img>
          </v-card>

          <v-card-actions>
            <v-btn
              text
              color="pink"
              :loading="uploading"
              :disabled="!form.ClubCode"
              @click="uploadLogo"
            >
              Upload
            </v-btn>

            <v-file-input
              accept="image/png, image/jpeg, image/gif, image/bmp, imge/svg"
              placeholder="Upload Club Logo"
              prepend-icon="mdi-photo"
              ref="fileUploader"
              class="d-none"
              @change="imageUploaded"
              label="Logo"
            >
              <template v-slot:default>
                <v-btn>Select file!</v-btn>
              </template>
            </v-file-input>
          </v-card-actions>
        </v-card> -->

        <!-- lol sorry! -->
        <image-uploader
          v-if="form.ClubCode"
          :card="{
            title: 'Upload Club Logo',
            class: 'mb-3',
            height: 'auto'
          }"
          :card-sheet="{ height: 'auto' }"
          :preview-image="{
            src: isUpdate ? `${api}/img/clubs/logos/${form.ClubCode}.png` : '',
            contain: true
          }"
          :file-name="form.ClubCode"
          :file-path="'/clubs/logos/'"
        />

        <image-uploader
          v-if="form.ClubCode"
          :card="{ title: 'Upload Club Kit', height: 400 }"
          :card-sheet="{ height: 400 }"
          :preview-image="{
            src: isUpdate
              ? `${api}/img/clubs/kits/${form.ClubCode}-kit.png`
              : '',
            contain: true
          }"
          :file-name="`${form.ClubCode}-kit`"
          :file-path="'/clubs/kits/'"
        />
      </v-col>

      <v-col cols="9">
        <v-form @submit.prevent="submit">
          <v-card>
            <!-- <v-toolbar flat color="amber darken-1">
          <v-toolbar-title>
            Create Club
          </v-toolbar-title>
        </v-toolbar> -->

            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.Name"
                    color="amber-darken-1"
                    label="Name"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="form.ClubCode"
                    color="amber-darken-1"
                    label="Code"
                  />
                </v-col>

                <v-col cols="6">
                  <div class="text-subtitle-1">Stadium</div>
                  <div class="d-flex flex-column">
                    <v-text-field
                      v-model="form.Stadium.Name"
                      color="amber-darken-1"
                      label="Name"
                    />

                    <v-text-field
                      v-model="form.Stadium.Capacity"
                      color="amber-darken-1"
                      label="Capacity"
                    />

                    <v-text-field
                      v-model="form.Stadium.Location"
                      color="amber-darken-1"
                      label="Location"
                    />
                  </div>
                </v-col>

                <v-col class="px-2" cols="6">
                  <div class="text-subtitle-1">Address</div>
                  <div class="d-flex flex-column">
                    <v-text-field
                      v-model="form.Address.Section"
                      color="amber-darken-1"
                      label="Section"
                    />

                    <v-text-field
                      v-model="form.Address.City"
                      color="amber-darken-1"
                      label="City"
                    />

                    <v-select
                      v-model="form.Address.Country"
                      color="amber-darken-1"
                      label="Country"
                      :items="countries"
                      item-title="Name"
                      item-value="_id"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-container>

            <v-divider />

            <v-card-actions>
              <v-spacer />
              <v-btn
                :color="`${isUpdate ? 'warning' : 'success'}`"
                @click="submit"
              >
                {{ isUpdate ? 'Update' : 'Create Club' }}
              </v-btn>

              <v-btn color="secondary" @click="$router.push('../clubs')">
                Cancel
              </v-btn>

              <v-btn v-if="isUpdate" color="error" @click="deleteClub">
                Remove
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-facing-decorator';
import { type Club } from '@/interfaces/club';
import { apiUrl } from '@/store';
import ImageUploader from '@/components/helpers/image-uploader.vue';

@Component({
  components: {
    ImageUploader
  }
})
export default class ClubForm extends Vue {
  @Prop({ required: false }) readonly isUpdate!: boolean;
  club: object = {};

  image!: File | undefined;

  api: string = apiUrl;

  uploadedImage: any = '';

  form: any = {
    Name: '',
    ClubCode: '',
    Manager: '',
    Address: {
      Section: '',
      City: '',
      Country: ''
    },
    Stadium: {
      Name: '',
      Capacity: '',
      Location: ''
    }
  };

  // TODO: upload files to server!

  // public countries: string[] = [
  //   'Ashter',
  //   'Bellean',
  //   'UPP',
  //   'Kiyoto',
  //   'Ekhastan',
  // ];

  uploading = false;

  get countries(): string[] {
    return this.$store.getters.countries;
  }

  upload() {
    const fileUploader = this.$refs.fileUploader as any;

    const fileInput = fileUploader.$refs.input as HTMLInputElement;
    fileInput.click();
  }

  uploadLogo() {
    const headers = {
      'Content-Type': 'multipart/form-data'
    };

    this.uploading = true;

    const formData = new FormData();

    formData.append('image', this.image as File);

    const path = JSON.stringify('/clubs/logos');

    const clubCode = this.form.ClubCode;

    this.$axios
      .post(`/files/upload?club_code=${clubCode}&path=${path}`, formData, {
        headers
      })
      .then(response => {
        console.log('res => ', response.data);

        // this.image = undefined;

        // this.uploadedImage = '';
      })
      .catch(response => {
        console.log('res => ', response.data);
      })
      .finally(() => {
        this.uploading = false;
      });
  }

  imageUploaded(file: File) {
    this.image = file;

    const reader = new FileReader();

    reader.addEventListener('load', e => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.uploadedImage = e.target!.result;
    });

    reader.readAsDataURL(file);
  }

  mounted(): void {
    if (this.isUpdate) {
      const clubID = this.$route.params['id'];
      // const clubCode = this.$route.params['code'];
      this.$axios
        .get(`/clubs/${clubID}`)
        .then(response => {
          this.club = response.data.payload as Club;
          this.form = response.data.payload as Club;
        })
        .catch(response => {
          console.log('Response => ', response);
        });
    }
  }

  submit(): void {
    const clubID = this.$route.params['id'];

    const url = this.isUpdate ? `/clubs/${clubID}/update` : '/clubs/new';

    this.$axios
      .post(url, { data: this.form })
      .then(response => {
        console.log('Response => ', response);
        this.$router.push({ name: 'Clubs Home' });
      })
      .catch(response => {
        console.log('Response => ', response);
      });
  }

  goBack() {
    this.$router.back();
  }

  deleteClub() {
    const answer = confirm(
      'Are you sure you want to delete ' + this.form.Name + '?!!'
    );

    if (answer) {
      const clubID = this.$route.params['id'];

      this.$axios
        .delete(`/clubs/${clubID}`)
        .then(response => {
          console.log('Successfully deleted Club => ', response);
          this.$router.push({ name: 'Clubs Home' });
        })
        .catch(response => {
          console.log('Error deleting comp =>', response.data);
        });
    }
  }
}
</script>

<style></style>
