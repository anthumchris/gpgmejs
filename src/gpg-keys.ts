enum FlagsCreate {
  GPGME_CREATE_WANTPUB,
  GPGME_CREATE_WANTSEC,
  GPGME_CREATE_FORCE,
  GPGME_CREATE_NOEXPIRE,
  GPGME_CREATE_ADSK,
  GPGME_CREATE_GROUP,
}
enum FlagsSigAdd {
  GPGME_KEYSIGN_LOCAL,
  GPGME_KEYSIGN_LFSEP,
  GPGME_KEYSIGN_NOEXPIRE,
  GPGME_KEYSIGN_FORCE,
}
enum FlagsSigAdd {
  GPGME_KEYSIGN_LOCAL,
  GPGME_KEYSIGN_LFSEP,
  GPGME_KEYSIGN_NOEXPIRE,
  GPGME_KEYSIGN_FORCE,
}
enum FlagsSigRevoke {
  GPGME_REVSIG_LFSEP,
}
enum FlagsExportMode {
  GPGME_EXPORT_MODE_EXTERN,
  GPGME_EXPORT_MODE_MINIMAL,
  GPGME_EXPORT_MODE_SSH,
  GPGME_EXPORT_MODE_SECRET,
  GPGME_EXPORT_MODE_SECRET_SUBKEY,
  GPGME_EXPORT_MODE_RAW,
  GPGME_EXPORT_MODE_PKCS12,
}
enum FlagsDelete {
  GPGME_DELETE_ALLOW_SECRET,
  GPGME_DELETE_FORCE,
}
enum FlagsTofuPolicy {
  GPGME_TOFU_POLICY_AUTO,
  GPGME_TOFU_POLICY_GOOD,
  GPGME_TOFU_POLICY_BAD,
  GPGME_TOFU_POLICY_ASK,
  GPGME_TOFU_POLICY_UNKNOWN,
}
enum KeyTrustLevel {
  'undefined',
  'disable',
  'never',
  'marginal',
  'full',
  'ultimate',
}

type FPR = string


/*  https://www.anthum.com/tmp/gnupgme/Generating-Keys.html#index-gpgme_005fop_005fcreatekey
    ^2.1.13
    gpgme_error_t gpgme_op_createkey (
      gpgme_ctx_t ctx,
      const char *userid,
      const char *algo,
      unsigned long reserved,
      unsigned long expires,
      gpgme_key_t extrakey,
      unsigned int flags
    )
  */
function gpgKeyCreate({ flags: FlagsCreate}) {}


/*  https://www.anthum.com/tmp/gnupgme/Generating-Keys.html#index-gpgme_005fop_005fcreatesubkey
    ^2.1.13
    gpgme_error_t gpgme_op_createsubkey (
      gpgme_ctx_t ctx
      gpgme_key_t key,
      const char *algo,
      unsigned long reserved,
      unsigned long expires,
      unsigned int flags
    )
  */
function gpgKeySubkeyAdd({ flags: FlagsCreate}) {}


/*  https://www.anthum.com/tmp/gnupgme/Generating-Keys.html#index-gpgme_005fop_005fadduid
    ^2.1.13
    gpgme_error_t gpgme_op_adduid (gpgme_ctx_t ctx, gpgme_key_t key, const char *userid, unsigned int flags);

  */
function gpgKeyUidAdd() {}


/*  https://www.anthum.com/tmp/gnupgme/Generating-Keys.html#index-gpgme_005fop_005frevuid
    ^2.1.13
    gpgme_error_t gpgme_op_revuid (gpgme_ctx_t ctx, gpgme_key_t key, const char *userid, unsigned int flags)
  */
function gpgKeyUidRevoke() {}


/*  https://www.anthum.com/tmp/gnupgme/Generating-Keys.html#index-gpgme_005fop_005fset_005fui_005fflag
    gpgme_error_t gpgme_op_set_ui_flag (gpgme_ctx_t ctx, gpgme_key_t key, const char *userid, cons char * name, cons char * value)
  */
function gpgKeyUidPrimarySet() {}


/*  https://www.anthum.com/tmp/gnupgme/Listing-Keys.html
  */
function gpgKeyListSearch() {}
function gpgKeyListAll() {}
function gpgKeyListFile() {}
function gpgKeyGet({ fpr: FPR}) {}


/*  https://www.anthum.com/tmp/gnupgme/Manipulating-Keys.html#index-gpgme_005fop_005fsetexpire
    ^2.1.22
  */
function gpgKeyExpire() {}


/*  https://www.anthum.com/tmp/gnupgme/Manipulating-Keys.html#index-gpgme_005fop_005fsetownertrust
    ^2.4.6

    gpgme_error_t gpgme_op_setownertrust (gpgme_ctx_t ctx, gpgme_key_t key, const char *value)
  */
function gpgKeyTrustSet({ value: KeyTrustLevel }) {}


/*  https://www.anthum.com/tmp/gnupgme/Signing-Keys.html#index-gpgme_005fop_005fkeysign
    ^2.1.12
  */
function gpgKeySigAdd({ flags: FlagsSigAdd}) {}  // signs keys


/*  https://www.anthum.com/tmp/gnupgme/Signing-Keys.html#index-gpgme_005fop_005frevsig
    ^2.2.24
  */
function gpgKeySigRvoke({ flags: FlagsSigRevoke}) {}  // signs keys


/*  https://www.anthum.com/tmp/gnupgme/Exporting-Keys.html#index-gpgme_005fop_005fexport
    https://www.anthum.com/tmp/gnupgme/Exporting-Keys.html#index-gpgme_005fop_005fexport_005fext
    https://www.anthum.com/tmp/gnupgme/Exporting-Keys.html#index-gpgme_005fop_005fexport_005fkeys

    (pattern or NULL for all), (keys[])
    gpgme_error_t gpgme_op_export       (gpgme_ctx_t ctx, const char *pattern,    gpgme_export_mode_t mode, gpgme_data_t keydata)
    gpgme_error_t gpgme_op_export_ext   (gpgme_ctx_t ctx, const char *pattern[],  gpgme_export_mode_t mode, gpgme_data_t keydata)
    gpgme_error_t gpgme_op_export_keys  (gpgme_ctx_t ctx, gpgme_key_t keys[],     gpgme_export_mode_t mode, gpgme_data_t keydata)
  */
function gpgKeyExport({ mode: FlagsExportMode, searchPattern: string }) {}


/*  https://www.anthum.com/tmp/gnupgme/Importing-Keys.html#index-gpgme_005fop_005fimport
    https://www.anthum.com/tmp/gnupgme/Importing-Keys.html#index-gpgme_005fop_005fimport_005fkeys
    https://www.anthum.com/tmp/gnupgme/Importing-Keys.html#index-gpgme_005fop_005freceive_005fkeys

    gpgme_error_t gpgme_op_import       (gpgme_ctx_t ctx, gpgme_data_t keydata)   file/stdin ASCII or binary
    gpgme_error_t gpgme_op_import_keys  (gpgme_ctx_t ctx, gpgme_key_t *keys)      in-memory?
    gpgme_error_t gpgme_op_receive_keys (gpgme_ctx_t ctx, const char *keyids[])   keyserver or external source
  */
function gpgKeyImport() {}


/*  https://www.anthum.com/tmp/gnupgme/Deleting-Keys.html#index-gpgme_005fop_005fdelete_005fext
    https://www.anthum.com/tmp/gnupgme/Deleting-Keys.html#index-gpgme_005fop_005fdelete

    gpgme_error_t gpgme_op_delete_ext (gpgme_ctx_t ctx, const gpgme_key_t key, unsigned int flags)
    gpgme_error_t gpgme_op_delete     (gpgme_ctx_t ctx, const gpgme_key_t key, int allow_secret)
  */
function gpgKeyDelete({ flags: FlagsDelete })


/*  https://www.anthum.com/tmp/gnupgme/Changing-Passphrases.html#index-gpgme_005fop_005fpasswd

    initiates a popup, "Thus this function is not useful in a server application
      (where passphrases are not required anyway)"
    gpgme_error_t gpgme_op_passwd (gpgme_ctx_t ctx, const gpgme_key_t key, unsigned int flags)
  */
function gpgKeyPassSet() {}


/*  https://www.anthum.com/tmp/gnupgme/Changing-TOFU-Data.html#index-gpgme_005fop_005ftofu_005fpolicy
    gpgme_error_t gpgme_op_tofu_policy (gpgme_ctx_t ctx, const gpgme_key_t key, gpgme_tofu_policy_t policy)
  */
function gpgKeyTofuSet({ flags: FlagsTofuPolicy }) {}

