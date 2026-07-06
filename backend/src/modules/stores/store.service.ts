import { AppError } from "../../errors/AppError.js";
import * as storeRepository from "./store.repository.js";
import type { OnboardingDTO, Store, UpdateStoreDTO } from "./store.types.js";

export const onboarding = async (
  ownerId: string,
  data: OnboardingDTO,
): Promise<Store> => {
  const existingStore = await storeRepository.getStoreByOwnerId(ownerId);

  if (existingStore) {
    throw new AppError("فروشگاه قبلاً ایجاد شده است.", 409);
  }

  const slugExists = await storeRepository.slugExists(data.slug);

  if (slugExists) {
    throw new AppError("این آدرس فروشگاه قبلاً استفاده شده است.", 409);
  }

  return await storeRepository.createStore(ownerId, data);
};


export const getMyStore = async (ownerId: string): Promise<Store> => {
  const store = await storeRepository.getStoreByOwnerId(ownerId);

  if (!store) {
    throw new AppError("فروشگاه پیدا نشد.", 404);
  }

  return store;
};


export const getStoreBySlug = async (slug: string): Promise<Store> => {
  const store = await storeRepository.getStoreBySlug(slug);

  if (!store) {
    throw new AppError("فروشگاه موردنظر وجود ندارد.", 404);
  }

  return store;
};


export const updateMyStore = async (
  ownerId: string,
  data: UpdateStoreDTO,
): Promise<Store> => {
  const existingStore = await storeRepository.getStoreByOwnerId(ownerId);

  if (!existingStore) {
    throw new AppError("فروشگاه پیدا نشد.", 404);
  }

  if (data.slug && data.slug !== existingStore.slug) {
    const slugExists = await storeRepository.slugExists(data.slug);

    if (slugExists) {
      throw new AppError("این آدرس فروشگاه قبلاً استفاده شده است.", 409);
    }
  }

  return await storeRepository.updateStore(ownerId, data);
};
